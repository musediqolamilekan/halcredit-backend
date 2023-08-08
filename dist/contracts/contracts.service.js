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
exports.ContractsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const contracts_schema_1 = require("./schemas/contracts.schema");
const file_service_1 = require("../service/file.service");
const winston_service_1 = require("../service/winston.service");
let ContractsService = exports.ContractsService = class ContractsService {
    constructor(contractModel, fileService) {
        this.contractModel = contractModel;
        this.fileService = fileService;
        this.logger = (0, winston_service_1.default)('contract', 'contract-error.log');
    }
    async create(createContractDto, user, supplierInvoiceFile, bankStatementsFile) {
        try {
            if (supplierInvoiceFile) {
                const supplierInvoiceUrl = await this.fileService.uploadToS3(supplierInvoiceFile, 'supplierInvoice');
                createContractDto.supplierInvoice = supplierInvoiceUrl;
            }
            if (bankStatementsFile) {
                const bankStatementsUrl = await this.fileService.uploadToS3(bankStatementsFile, 'bankStatements');
                createContractDto.bankStatement = bankStatementsUrl;
            }
            const createdContract = new this.contractModel({
                ...createContractDto,
                user: user._id,
            });
            return await createdContract.save();
        }
        catch (error) {
            console.log(error);
            this.logger.error(`Failed to create contract: ${error.message}`);
            throw error;
        }
    }
    async findAll(user) {
        try {
            return await this.contractModel.find({ user: user._id });
        }
        catch (error) {
            this.logger.error(`Failed to get contracts: ${error.message}`);
            throw error;
        }
    }
    async getContractById(id, user) {
        try {
            return await this.contractModel.findOne({ _id: id, user: user._id });
        }
        catch (error) {
            this.logger.error(`Failed to get contract: ${error.message}`);
            throw error;
        }
    }
    async updateContract(id, updateContractDto, user) {
        try {
            return await this.contractModel.findOneAndUpdate({ _id: id, user: user._id }, updateContractDto, { new: true });
        }
        catch (error) {
            this.logger.error(`Failed to update contract: ${error.message}`);
            throw error;
        }
    }
    async deleteContract(id, user) {
        try {
            return await this.contractModel.findOneAndRemove({
                _id: id,
                user: user._id,
            });
        }
        catch (error) {
            this.logger.error(`Failed to delete contract: ${error.message}`);
            throw error;
        }
    }
};
exports.ContractsService = ContractsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(contracts_schema_1.Contracts.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        file_service_1.FileService])
], ContractsService);
//# sourceMappingURL=contracts.service.js.map