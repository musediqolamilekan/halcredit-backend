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
exports.InvestorController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const investor_service_1 = require("./investor.service");
const jwt_guard_1 = require("../service/jwt.guard");
const winston_service_1 = require("../service/winston.service");
let InvestorController = exports.InvestorController = class InvestorController {
    constructor(investorService) {
        this.investorService = investorService;
        this.logger = (0, winston_service_1.default)('investor', 'investor.error.log');
    }
    handleHttpException(error, message, statusCode) {
        this.logger.error(message, error);
        throw new common_1.HttpException(message || error.message, statusCode);
    }
    async handleInvestorProcess(investorPromise, failureMessage, statusCode) {
        try {
            return await investorPromise;
        }
        catch (error) {
            this.handleHttpException(error, failureMessage, statusCode);
        }
    }
    async getCurrentUser(token) {
        return this.handleInvestorProcess(this.investorService.getInvestorByToken(token), 'Failed to get investor by token.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async create(createInvestorDto) {
        return this.handleInvestorProcess(this.investorService.create(createInvestorDto), 'Failed to create investor.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async update(token, updateInvestorDto) {
        return this.handleInvestorProcess(this.investorService.updateInvestor(updateInvestorDto, token), 'Failed to update investor.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
__decorate([
    (0, common_1.Get)('/update-kyc/:token'),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Post)('/show-interest'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateInvestorDto]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('/update-kyc/:token'),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateInvestorDto]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "update", null);
exports.InvestorController = InvestorController = __decorate([
    (0, common_1.Controller)('investor'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __metadata("design:paramtypes", [investor_service_1.InvestorService])
], InvestorController);
//# sourceMappingURL=investor.controller.js.map