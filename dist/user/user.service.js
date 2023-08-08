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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const mongoose_2 = require("mongoose");
const file_service_1 = require("../service/file.service");
const bcrypt = require("bcryptjs");
const winston_service_1 = require("../service/winston.service");
const jwt = require("jsonwebtoken");
let UserService = exports.UserService = class UserService {
    constructor(userModel, fileService) {
        this.userModel = userModel;
        this.fileService = fileService;
        this.logger = (0, winston_service_1.default)('user-service', 'user.error.log');
    }
    async getUserById(user) {
        const id = user._id;
        try {
            const foundUser = await this.userModel.findById(id).select('-password');
            if (!foundUser) {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            return foundUser;
        }
        catch (error) {
            this.logger.error(`Failed to get user: ${error.message}`);
            throw error;
        }
    }
    async updateUser(updateUserDto, user, file) {
        const currentUserId = user._id;
        const foundUser = await this.userModel.findById(currentUserId);
        if (!foundUser) {
            throw new common_1.NotFoundException(`User with ID ${currentUserId} not found`);
        }
        try {
            if (file) {
                const profileImageUrl = await this.fileService.uploadToS3(file, 'picture');
                updateUserDto.profilePicture = profileImageUrl;
            }
            const updatedUser = await this.userModel
                .findByIdAndUpdate(currentUserId, updateUserDto, { new: true })
                .select('-password');
            if (!updatedUser) {
                throw new common_1.NotFoundException(`User with ID ${currentUserId} not found`);
            }
            return updatedUser;
        }
        catch (error) {
            this.logger.error(`Failed to update user: ${error.message}`);
            throw error;
        }
    }
    async validateUserPassword(email, password) {
        try {
            const user = await this.userModel.findOne({ email });
            if (!user) {
                return null;
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            return passwordMatch ? user : null;
        }
        catch (error) {
            this.logger.error(`Failed to validate user: ${error.message}`);
            throw error;
        }
    }
    async findOrCreate(userDto) {
        const { email, firstName, lastName } = userDto;
        let user = await this.userModel.findOne({ email });
        if (!user) {
            user = await this.userModel.create({
                firstName,
                lastName,
                email,
                status: 'active',
                isVerified: true,
                createdAt: new Date(),
            });
        }
        return user;
    }
    async storeUserTransactionPin(storeUserTransactionPinDto, user) {
        const { pin, confirmPin } = storeUserTransactionPinDto;
        try {
            const existingUser = await this.userModel.findById(user._id);
            if (!existingUser) {
                throw new common_1.UnauthorizedException('Invalid user');
            }
            if (pin !== confirmPin) {
                throw new common_1.BadRequestException('Pin does not match the confirm pin');
            }
            const hashedPin = await bcrypt.hash(pin, 10);
            existingUser.transactionPin = hashedPin;
            await existingUser.save();
            const { transactionPin, ...userWithoutSensitiveData } = existingUser.toObject();
            return {
                message: 'Transaction pin successfully stored',
                user: userWithoutSensitiveData,
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException('Pin does not match the confirm pin');
            }
            this.logger.error(`storeUserTransactionPin failed for user id: ${JSON.stringify(user._id)}`, error);
            throw new common_1.InternalServerErrorException('Failed to store user transaction pin');
        }
    }
    getSubFromAuthorizationHeader(req) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            throw new common_1.UnauthorizedException('Authorization header missing');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new common_1.UnauthorizedException('Token missing from Authorization header');
        }
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            return decoded.sub;
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        file_service_1.FileService])
], UserService);
//# sourceMappingURL=user.service.js.map