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
exports.ContractsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../service/jwt.guard");
const contracts_service_1 = require("./contracts.service");
const create_contract_dto_1 = require("./dto/create-contract.dto");
const update_contract_dto_1 = require("./dto/update-contract.dto");
const platform_express_1 = require("@nestjs/platform-express");
const winston_service_1 = require("../service/winston.service");
let ContractsController = exports.ContractsController = class ContractsController {
    constructor(contractsService) {
        this.contractsService = contractsService;
        this.logger = (0, winston_service_1.default)('contracts', 'contracts.error.log');
    }
    handleHttpException(error, message, statusCode) {
        this.logger.error(message, error);
        throw new common_1.HttpException(message || error.message, statusCode);
    }
    async handleContractProcess(contractPromise, failureMessage, statusCode) {
        try {
            return await contractPromise;
        }
        catch (error) {
            this.handleHttpException(error, failureMessage, statusCode);
        }
    }
    async create(files, req, createContractDto) {
        const supplierInvoiceFile = files.supplierInvoice
            ? files.supplierInvoice[0]
            : null;
        const bankStatementsFile = files.bankStatements
            ? files.bankStatements[0]
            : null;
        return this.handleContractProcess(this.contractsService.create(createContractDto, req.user, supplierInvoiceFile, bankStatementsFile), 'Failed to create contract.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async findAll(req) {
        return this.handleContractProcess(this.contractsService.findAll(req.user), 'Failed to get all contracts.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async findOne(id, req) {
        return this.handleContractProcess(this.contractsService.getContractById(id, req.user), 'Failed to get contract.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async update(id, updateContractDto, req) {
        return this.handleContractProcess(this.contractsService.updateContract(id, updateContractDto, req.user), 'Failed to update contract.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async delete(id, req) {
        return this.handleContractProcess(this.contractsService.deleteContract(id, req.user), 'Failed to delete contract.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'supplierInvoice', maxCount: 1 },
        { name: 'bankStatements', maxCount: 1 },
    ])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_contract_dto_1.CreateContractDto]),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/getAll'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_contract_dto_1.UpdateContractDto, Object]),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "delete", null);
exports.ContractsController = ContractsController = __decorate([
    (0, common_1.Controller)('contracts'),
    __metadata("design:paramtypes", [contracts_service_1.ContractsService])
], ContractsController);
//# sourceMappingURL=contracts.controller.js.map