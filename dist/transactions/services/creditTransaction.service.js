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
exports.CreditTransactionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const creditTransaction_schema_1 = require("../schemas/creditTransaction.schema");
const winston_service_1 = require("../../service/winston.service");
let CreditTransactionService = exports.CreditTransactionService = class CreditTransactionService {
    constructor(transactionModel) {
        this.transactionModel = transactionModel;
        this.logger = (0, winston_service_1.default)('transaction-service', 'transaction.error.log');
    }
    async create(createTransactionDto, user) {
        try {
            const createdTransaction = new this.transactionModel({
                ...createTransactionDto,
                user: user._id,
            });
            return await createdTransaction.save();
        }
        catch (error) {
            this.logger.error(`Failed to create transaction for user id: ${JSON.stringify(user._id)}`, error);
            throw new common_1.InternalServerErrorException('Failed to create transaction');
        }
    }
    async findAll(user) {
        try {
            return await this.transactionModel.find({ user: user._id }).exec();
        }
        catch (error) {
            this.logger.error(`Failed to fetch transactions for user id: ${JSON.stringify(user._id)}`, error);
            throw new common_1.InternalServerErrorException('Failed to fetch transactions');
        }
    }
    async remove(id, user) {
        try {
            const transaction = await this.transactionModel.findById(id).exec();
            if (!transaction || String(transaction.user) !== String(user._id)) {
                throw new common_1.UnauthorizedException('Invalid transaction');
            }
            await this.transactionModel.findByIdAndRemove(id).exec();
        }
        catch (error) {
            this.logger.error(`Failed to delete transaction id: ${JSON.stringify(id)} for user id: ${JSON.stringify(user._id)}`, error);
            throw new common_1.InternalServerErrorException('Failed to delete transaction');
        }
    }
};
exports.CreditTransactionService = CreditTransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(creditTransaction_schema_1.CreditTransaction.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CreditTransactionService);
//# sourceMappingURL=creditTransaction.service.js.map