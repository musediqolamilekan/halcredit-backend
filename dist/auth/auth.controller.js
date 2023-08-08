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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const dto_1 = require("./dto");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const jwt_guard_1 = require("../service/jwt.guard");
const winston_service_1 = require("../service/winston.service");
let AuthController = exports.AuthController = class AuthController {
    constructor(authService, configService, jwtService) {
        this.authService = authService;
        this.configService = configService;
        this.jwtService = jwtService;
        this.logger = (0, winston_service_1.default)('auth', 'auth.error.log');
    }
    handleHttpException(error, message, statusCode) {
        this.logger.error(message, error);
        throw new common_1.HttpException(message || error.message, statusCode);
    }
    async handleAuthProcess(authPromise, failureMessage, statusCode) {
        try {
            return await authPromise;
        }
        catch (error) {
            this.handleHttpException(error, failureMessage, statusCode);
        }
    }
    async signUp(signUpDto) {
        return this.handleAuthProcess(this.authService.signUp(signUpDto), 'Registration failed.', common_1.HttpStatus.BAD_REQUEST);
    }
    async login(loginDto) {
        return this.handleAuthProcess(this.authService.login(loginDto), 'Login failed.', common_1.HttpStatus.UNAUTHORIZED);
    }
    async forgotPassword(forgotPasswordDto) {
        return this.handleAuthProcess(this.authService.forgotPassword(forgotPasswordDto.email), 'Forgot password failed.', common_1.HttpStatus.BAD_REQUEST);
    }
    async resetPassword(resetPasswordDto) {
        return this.handleAuthProcess(this.authService.resetPassword(resetPasswordDto.token, resetPasswordDto.newPassword), 'Password reset failed.', common_1.HttpStatus.BAD_REQUEST);
    }
    async verifyEmail(verifyEmailDto) {
        return this.handleAuthProcess(this.authService.verifyEmail(verifyEmailDto.userId, verifyEmailDto.token), 'Email verification failed.', common_1.HttpStatus.BAD_REQUEST);
    }
    async deleteAccount(email) {
        return this.handleAuthProcess(this.authService.deleteAccount(email), 'Account deletion failed.', common_1.HttpStatus.BAD_REQUEST);
    }
    async handleGoogleSignIn(authorization) {
        if (!authorization) {
            throw new common_1.HttpException('No authorization header found', common_1.HttpStatus.UNAUTHORIZED);
        }
        const googleToken = authorization.replace('Bearer ', '');
        return this.handleAuthProcess(this.authService.findOrCreateFromGoogle({ googleToken }), 'Google Sign In failed.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async resendToken(req) {
        return this.handleAuthProcess(this.authService.resendToken(req.user), 'Resending token failed.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/forgot-password'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ForgotPassword]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('/reset-password'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ResetPassword]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)('/verify-email'),
    __param(0, (0, common_1.Query)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.VerifyEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)('/delete-account'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteAccount", null);
__decorate([
    (0, common_1.Post)('/google/auth'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleGoogleSignIn", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/resend-token'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map