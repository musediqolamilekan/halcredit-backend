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
exports.BankStatementsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bank_statements_schema_1 = require("./schemas/bank_statements.schema");
const file_service_1 = require("../service/file.service");
const winston_service_1 = require("../service/winston.service");
let BankStatementsService = exports.BankStatementsService = class BankStatementsService {
    constructor(bankStatementModel, fileService) {
        this.bankStatementModel = bankStatementModel;
        this.fileService = fileService;
        this.logger = (0, winston_service_1.default)('bankStatement', 'bankStatement-error.log');
    }
    async createOrUpdate(createBankStatementDto, user, statementFile) {
        const currentUserId = user._id;
        try {
            if (statementFile) {
                const statementUrl = await this.fileService.uploadToS3(statementFile, 'statement');
                createBankStatementDto.statement = statementUrl;
            }
            const uploadStatement = await this.bankStatementModel.findOneAndUpdate({ user: currentUserId }, { ...createBankStatementDto, user: currentUserId }, { new: true, upsert: true, useFindAndModify: false });
            return uploadStatement;
        }
        catch (error) {
            console.log(error);
            this.logger.error(`Failed to upload statement: ${error.message}`);
            throw error;
        }
    }
};
exports.BankStatementsService = BankStatementsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bank_statements_schema_1.BankStatements.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        file_service_1.FileService])
], BankStatementsService);
//# sourceMappingURL=bank_statements.service.js.map