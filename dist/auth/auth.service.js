"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const crypto = require("crypto");
const user_schema_1 = require("../user/schemas/user.schema");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const google_auth_library_1 = require("google-auth-library");
const email_service_1 = require("../service/email.service");
const axios_1 = require("axios");
const winston_service_1 = require("../service/winston.service");
const notification_strategy_1 = require("../notification/socket/notification.strategy");
let AuthService = exports.AuthService = class AuthService {
    constructor(userModel, jwtService, configService, emailService, notificationStrategy) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.configService = configService;
        this.emailService = emailService;
        this.notificationStrategy = notificationStrategy;
        this.logger = (0, winston_service_1.default)('auth', 'auth.error.log');
        this.saltRounds =
            this.configService.get('BCRYPT_SALT_ROUNDS') ?? 10;
        this.oauthClient = new google_auth_library_1.OAuth2Client(this.configService.get('GOOGLE_CLIENT_ID'));
    }
    async createUser(signUpDto) {
        const { firstName, lastName, email, phone, password } = signUpDto;
        const saltRounds = parseInt(this.configService.get('BCRYPT_SALT_ROUNDS')) || 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return await this.userModel.create({
            firstName,
            lastName,
            email,
            phone,
            status: 'active',
            isVerified: false,
            password: hashedPassword,
            createdAt: new Date(),
        });
    }
    async generateJwt(user) {
        return this.jwtService.sign({
            sub: user._id.toString(),
            phone: user.phone,
            email: user.email,
            accessKey: 'User',
        });
    }
    async excludePassword(userId) {
        return await this.userModel.findById(userId).select('-password');
    }
    async signUp(signUpDto) {
        const { email } = signUpDto;
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            this.logger.error(`User already exists: ${JSON.stringify(email)}`);
            throw new common_1.ConflictException('User already exists');
        }
        try {
            let user = await this.createUser(signUpDto);
            user = await this.excludePassword(user._id);
            const token = await this.generateJwt(user);
            await this.sendVerificationToken(user._id);
            const userId = user._id.toString();
            const notificationMessage = {
                message: 'Welcome to Halcredit',
                title: 'Registration',
            };
            this.notificationStrategy.sendNotification(userId, notificationMessage);
            return { message: 'Success', accessToken: token, user };
        }
        catch (error) {
            this.logger.error(`Sign up failed for email: ${JSON.stringify(email)}`, error);
            throw new common_1.InternalServerErrorException('Sign Up Failed');
        }
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            this.logger.error(`Invalid email: ${JSON.stringify(email)}`);
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            this.logger.error(`Invalid password: ${JSON.stringify(email)}`);
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        try {
            const token = await this.generateJwt(user);
            const userWithoutPassword = await this.excludePassword(user._id);
            return {
                message: 'Success',
                accessToken: token,
                user: userWithoutPassword,
            };
        }
        catch (error) {
            this.logger.error(`Login failed for email: ${JSON.stringify(email)}`, error);
            throw new common_1.InternalServerErrorException('Login Failed');
        }
    }
    async forgotPassword(email) {
        try {
            const user = await this.userModel.findOne({ email });
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid email');
            }
            const resetToken = crypto.randomInt(10000, 100000).toString();
            const hashedResetToken = crypto
                .createHash('sha256')
                .update(resetToken)
                .digest('hex');
            user.passwordResetToken = hashedResetToken;
            user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
            await user.save();
            this.emailService.sendForgotPasswordEmail(user, resetToken);
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            this.logger.error(`forgotPassword failed for email: ${JSON.stringify(email)}`, error);
            throw new common_1.InternalServerErrorException('Failed to process forgot password request');
        }
    }
    async resetPassword(resetToken, newPassword) {
        try {
            const hashedToken = crypto
                .createHash('sha256')
                .update(resetToken)
                .digest('hex');
            const user = await this.userModel.findOne({
                passwordResetToken: hashedToken,
                passwordResetExpires: { $gt: Date.now() },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('Token is invalid or has expired');
            }
            user.password = await bcrypt.hash(newPassword, 10);
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save();
            const userId = user._id.toString();
            const notificationMessage = {
                title: 'Reset Password',
                message: `Dear ${user.firstName}, your password has been successfully reset. If you did not initiate this request, please contact support immediately.`,
            };
            this.notificationStrategy.sendNotification(userId, notificationMessage);
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            this.logger.error(`resetPassword failed for token: ${JSON.stringify(resetToken)}`, error);
            throw new common_1.InternalServerErrorException('Failed to reset password');
        }
    }
    async validateUser(id) {
        try {
            const user = await this.userModel
                .findOne({ _id: id })
                .select('-password');
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            return user;
        }
        catch (error) {
            this.logger.error(`Failed to validate user: ${error.message}`);
            throw error;
        }
    }
    async sendVerificationToken(userId) {
        try {
            const verificationToken = crypto.randomBytes(5).toString('hex');
            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid user id');
            }
            user.emailVerificationToken = verificationToken;
            await user.save();
            const verificationLink = `${this.configService.get('VERIFICATION_BASE_URL')}?userId=${userId}&token=${verificationToken}`;
            this.emailService.sendEmailVerification(user, verificationLink);
        }
        catch (error) {
            this.logger.error(`sendVerificationToken failed for user id: ${JSON.stringify(userId)}`, error);
            throw new common_1.InternalServerErrorException('Failed to process send verification token request');
        }
    }
    async verifyEmail(userId, verificationToken) {
        try {
            const user = await this.userModel.findById(userId);
            if (!user || user.emailVerificationToken !== verificationToken) {
                throw new common_1.UnauthorizedException('Invalid user or token');
            }
            user.isVerified = true;
            user.emailVerificationToken = undefined;
            await user.save();
            const notificationMessage = {
                title: 'Verify Email',
                message: `Dear ${user.firstName}, your email address has been successfully verified. Welcome to our service!`,
            };
            this.notificationStrategy.sendNotification(userId, notificationMessage);
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            this.logger.error(`verifyEmail failed for user id: ${JSON.stringify(userId)}`, error);
            throw new common_1.InternalServerErrorException('Failed to verify email');
        }
    }
    async deleteAccount(email) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.userModel.deleteOne({ email });
        return { message: 'Account deleted successfully' };
    }
    async findOrCreateFromGoogle(googleTokenDto) {
        const { googleToken } = googleTokenDto;
        let userInfo;
        try {
            const googleApiUrl = this.configService.get('GOOGLE_API_URL');
            const response = await axios_1.default.get(`${googleApiUrl}/oauth2/v3/userinfo`, {
                headers: { Authorization: `Bearer ${googleToken}` },
            });
            userInfo = response.data;
        }
        catch (error) {
            this.logger.error(`Failed to verify Google token: ${googleToken}`, error);
            throw new common_1.HttpException('Failed to verify Google token', common_1.HttpStatus.UNAUTHORIZED);
        }
        const { email, given_name: firstName, family_name: lastName } = userInfo;
        try {
            let user = await this.userModel.findOne({ email }).select('-password');
            if (!user) {
                user = await this.userModel.create({
                    firstName,
                    lastName,
                    email,
                    status: 'active',
                    isVerified: true,
                    createdAt: new Date(),
                });
                const userId = user._id.toString();
                const notificationMessage = {
                    title: 'Registration',
                    message: `Welcome ${user.firstName}! Your account has been successfully created through Google Sign In.`,
                };
                this.notificationStrategy.sendNotification(userId, notificationMessage);
            }
            const token = await this.generateJwt(user);
            return { user: user, accessToken: token };
        }
        catch (error) {
            this.logger.error(`Failed to find or create user for email: ${email}`, error);
            throw new common_1.HttpException('Failed to find or create user', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async resendToken(user) {
        try {
            const userDoc = await this.userModel.findById(user._id);
            if (!userDoc) {
                throw new common_1.NotFoundException('User not found');
            }
            if (userDoc.isVerified) {
                return { message: 'User is already verified' };
            }
            await this.sendVerificationToken(userDoc._id);
            const userId = user._id.toString();
            const notificationMessage = {
                title: 'Email Sent',
                message: `A new verification email has been sent to your email address. Please verify your account.`,
            };
            this.notificationStrategy.sendNotification(userId, notificationMessage);
            return { message: 'Verification email sent successfully' };
        }
        catch (error) {
            this.logger.error(`resendToken failed for user: ${JSON.stringify(user._id)}`, error);
            throw new common_1.InternalServerErrorException('Failed to process resend token request');
        }
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        config_1.ConfigService,
        email_service_1.EmailService,
        notification_strategy_1.NotificationStrategy])
], AuthService);
//# sourceMappingURL=auth.service.js.map