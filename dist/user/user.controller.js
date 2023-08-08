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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../service/jwt.guard");
const user_service_1 = require("./user.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const transaction_pin_dto_1 = require("./dto/transaction-pin.dto");
const platform_express_1 = require("@nestjs/platform-express");
const winston_service_1 = require("../service/winston.service");
let UserController = exports.UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.logger = (0, winston_service_1.default)('user', 'user.error.log');
    }
    handleHttpException(error, message, statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logger.error(message || error.message);
        throw new common_1.HttpException(message || error.message, statusCode);
    }
    async handleUserProcess(userPromise, failureMessage) {
        try {
            return await userPromise;
        }
        catch (error) {
            this.handleHttpException(error, failureMessage);
        }
    }
    async getCurrentUser({ user }) {
        return this.handleUserProcess(this.userService.getUserById(user), 'Failed to get current user.');
    }
    async updateUser(updateUserDto, file, { user }) {
        return this.handleUserProcess(this.userService.updateUser(updateUserDto, user, file), 'Failed to update user.');
    }
    async storeUserTransactionPin(storeUserTransactionPinDto, { user }) {
        return this.handleUserProcess(this.userService.storeUserTransactionPin(storeUserTransactionPinDto, user), 'Failed to store user transaction pin.');
    }
    async getSubFromToken(req) {
        try {
            const sub = await this.userService.getSubFromAuthorizationHeader(req);
            return { sub };
        }
        catch (error) {
            this.logger.error(`Failed to get sub from token: ${error.message}`);
            throw new common_1.HttpException('Failed to get sub from token', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Get)('/me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Put)('/me'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Put)('/me/transaction-pin'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transaction_pin_dto_1.StoreUserTransactionPinDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "storeUserTransactionPin", null);
__decorate([
    (0, common_1.Get)('/sub'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getSubFromToken", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('profile'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map