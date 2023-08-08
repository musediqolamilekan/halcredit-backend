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
exports.CreditTransactionController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../../service/jwt.guard");
const creditTransaction_service_1 = require("./../services/creditTransaction.service");
const credit_transaction_dto_1 = require("../dto/credit-transaction.dto");
const winston_service_1 = require("../../service/winston.service");
let CreditTransactionController = exports.CreditTransactionController = class CreditTransactionController {
    constructor(creditTransactionService) {
        this.creditTransactionService = creditTransactionService;
        this.logger = (0, winston_service_1.default)('transaction', 'transaction.error.log');
    }
    async handleTransactionProcess(transactionPromise, failureMessage, statusCode) {
        try {
            return await transactionPromise;
        }
        catch (error) {
            this.logger.error(failureMessage, error);
            throw new common_1.HttpException(error.message, statusCode);
        }
    }
    async create(req, creditTransactionDto) {
        return this.handleTransactionProcess(this.creditTransactionService.create(creditTransactionDto, req.user), 'Failed to create transaction.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async findAll(req) {
        return this.handleTransactionProcess(this.creditTransactionService.findAll(req.user), 'Failed to fetch transactions.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async remove(req, id) {
        return this.handleTransactionProcess(this.creditTransactionService.remove(id, req.user), 'Failed to remove transaction.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, credit_transaction_dto_1.CreditTransactionDto]),
    __metadata("design:returntype", Promise)
], CreditTransactionController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/get'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreditTransactionController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CreditTransactionController.prototype, "remove", null);
exports.CreditTransactionController = CreditTransactionController = __decorate([
    (0, common_1.Controller)('credit-transactions'),
    __metadata("design:paramtypes", [creditTransaction_service_1.CreditTransactionService])
], CreditTransactionController);
//# sourceMappingURL=creditTransaction.controller.js.map