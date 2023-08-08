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
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const invoices_schema_1 = require("./schemas/invoices.schema");
const winston_service_1 = require("../service/winston.service");
let InvoiceService = exports.InvoiceService = class InvoiceService {
    constructor(invoiceModel) {
        this.invoiceModel = invoiceModel;
        this.logger = (0, winston_service_1.default)('invoice-service', 'invoice.error.log');
    }
    async create(createInvoiceDto, user) {
        const createdInvoice = new this.invoiceModel({
            ...createInvoiceDto,
            user: user._id,
        });
        try {
            return await createdInvoice.save();
        }
        catch (error) {
            this.logger.error(`Failed to create invoice: ${error.message}`);
            throw error;
        }
    }
    async getInvoiceById(id, user) {
        try {
            return await this.invoiceModel.findOne({ _id: id, user: user._id });
        }
        catch (error) {
            this.logger.error(`Failed to get invoice: ${error.message}`);
            throw error;
        }
    }
    async findAll(user) {
        try {
            return await this.invoiceModel.find({ user: user._id });
        }
        catch (error) {
            this.logger.error(`Failed to get suppliers: ${error.message}`);
            throw error;
        }
    }
    async updateInvoice(id, updateInvoiceDto, user) {
        try {
            return await this.invoiceModel.findOneAndUpdate({ _id: id, user: user._id }, updateInvoiceDto, { new: true });
        }
        catch (error) {
            this.logger.error(`Failed to update invoice: ${error.message}`);
            throw error;
        }
    }
    async deleteInvoice(id, user) {
        try {
            return await this.invoiceModel.findOneAndRemove({
                _id: id,
                user: user._id,
            });
        }
        catch (error) {
            this.logger.error(`Failed to delete invoice: ${error.message}`);
            throw error;
        }
    }
};
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(invoices_schema_1.Invoice.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], InvoiceService);
//# sourceMappingURL=invoices.service.js.map