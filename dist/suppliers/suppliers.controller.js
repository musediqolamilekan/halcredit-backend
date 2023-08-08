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
exports.SuppliersController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../service/jwt.guard");
const suppliers_service_1 = require("./suppliers.service");
const dto_1 = require("./dto");
const winston_service_1 = require("../service/winston.service");
let SuppliersController = exports.SuppliersController = class SuppliersController {
    constructor(suppliersService) {
        this.suppliersService = suppliersService;
        this.logger = (0, winston_service_1.default)('supplier-service', 'supplier.error.log');
    }
    handleHttpException(error, message, statusCode) {
        this.logger.error(message, error);
        throw new common_1.HttpException(message || error.message, statusCode);
    }
    async handleSupplierProcess(supplierPromise, failureMessage, statusCode) {
        try {
            return await supplierPromise;
        }
        catch (error) {
            this.handleHttpException(error, failureMessage, statusCode);
        }
    }
    async create(createSupplierDto, { user }) {
        return this.handleSupplierProcess(this.suppliersService.create(createSupplierDto, user), 'Failed to create supplier.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async findAll({ user }) {
        return this.handleSupplierProcess(this.suppliersService.findAll(user), 'Failed to get all suppliers.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async findOne(id, { user }) {
        return this.handleSupplierProcess(this.suppliersService.getSupplierById(id, user), `Failed to get supplier by id: ${id}.`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async update(id, updateSupplierDto, { user }) {
        return this.handleSupplierProcess(this.suppliersService.updateSupplier(id, updateSupplierDto, user), `Failed to update supplier: ${id}.`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async delete(id, { user }) {
        return this.handleSupplierProcess(this.suppliersService.deleteSupplier(id, user), `Failed to delete supplier: ${id}.`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateSupplierDto, Object]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/getAll'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateSupplierDto, Object]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "delete", null);
exports.SuppliersController = SuppliersController = __decorate([
    (0, common_1.Controller)('suppliers'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __metadata("design:paramtypes", [suppliers_service_1.SuppliersService])
], SuppliersController);
//# sourceMappingURL=suppliers.controller.js.map