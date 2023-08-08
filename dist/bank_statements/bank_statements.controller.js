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
exports.BankStatementsController = void 0;
const common_1 = require("@nestjs/common");
const bank_statement_dto_1 = require("./dto/bank_statement.dto");
const bank_statements_service_1 = require("./bank_statements.service");
const platform_express_1 = require("@nestjs/platform-express");
const winston_service_1 = require("../service/winston.service");
let BankStatementsController = exports.BankStatementsController = class BankStatementsController {
    constructor(bankStatementsService) {
        this.bankStatementsService = bankStatementsService;
        this.logger = (0, winston_service_1.default)('bankStatement', 'bankStatement-error.log');
    }
    handleHttpException(error, message, statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logger.error(message || error.message);
        throw new common_1.HttpException(message || error.message, statusCode);
    }
    async handleStatementProcess(userPromise, failureMessage) {
        try {
            return await userPromise;
        }
        catch (error) {
            this.handleHttpException(error, failureMessage);
        }
    }
    createOrUpdate(createBankStatementDto, statement, { user }) {
        return this.handleStatementProcess(this.bankStatementsService.createOrUpdate(createBankStatementDto, user, statement), 'Failed to upload statement.');
    }
};
__decorate([
    (0, common_1.Post)('/request'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('statement')),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bank_statement_dto_1.CreateBankStatementDto, Object, Object]),
    __metadata("design:returntype", Promise)
], BankStatementsController.prototype, "createOrUpdate", null);
exports.BankStatementsController = BankStatementsController = __decorate([
    (0, common_1.Controller)('bank-statements'),
    __metadata("design:paramtypes", [bank_statements_service_1.BankStatementsService])
], BankStatementsController);
//# sourceMappingURL=bank_statements.controller.js.map