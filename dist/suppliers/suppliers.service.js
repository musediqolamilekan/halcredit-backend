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
exports.SuppliersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const suppliers_schema_1 = require("./schemas/suppliers.schema");
const winston_service_1 = require("../service/winston.service");
let SuppliersService = exports.SuppliersService = class SuppliersService {
    constructor(supplierModel) {
        this.supplierModel = supplierModel;
        this.logger = (0, winston_service_1.default)('supplier-service', 'supplier.error.log');
    }
    async create(createSupplierDto, user) {
        const createdSupplier = new this.supplierModel({
            ...createSupplierDto,
            user: user._id,
        });
        try {
            return await createdSupplier.save();
        }
        catch (error) {
            this.logger.error(`Failed to create supplier: ${error.message}`);
            throw error;
        }
    }
    async findAll(user) {
        try {
            return await this.supplierModel.find({ user: user._id });
        }
        catch (error) {
            this.logger.error(`Failed to get suppliers: ${error.message}`);
            throw error;
        }
    }
    async getSupplierById(id, user) {
        try {
            return await this.supplierModel.findOne({ _id: id, user: user._id });
        }
        catch (error) {
            this.logger.error(`Failed to get supplier: ${error.message}`);
            throw error;
        }
    }
    async updateSupplier(id, updateSupplierDto, user) {
        try {
            return await this.supplierModel.findOneAndUpdate({ _id: id, user: user._id }, updateSupplierDto, { new: true });
        }
        catch (error) {
            this.logger.error(`Failed to update supplier: ${error.message}`);
            throw error;
        }
    }
    async deleteSupplier(id, user) {
        try {
            return await this.supplierModel.findOneAndRemove({
                _id: id,
                user: user._id,
            });
        }
        catch (error) {
            this.logger.error(`Failed to delete supplier: ${error.message}`);
            throw error;
        }
    }
};
exports.SuppliersService = SuppliersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(suppliers_schema_1.Suppliers.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SuppliersService);
//# sourceMappingURL=suppliers.service.js.map