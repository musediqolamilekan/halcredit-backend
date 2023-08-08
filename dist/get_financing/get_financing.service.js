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
exports.GetFinancingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const invoice_schema_1 = require("./schemas/invoice.schema");
const winston_service_1 = require("../service/winston.service");
const file_service_1 = require("../service/file.service");
const ipa_schema_1 = require("./schemas/ipa.schema");
const repaymentPlan_service_1 = require("../service/repaymentPlan.service");
let GetFinancingService = exports.GetFinancingService = class GetFinancingService {
    constructor(invoiceModel, IPAModel, fileService, repaymentService) {
        this.invoiceModel = invoiceModel;
        this.IPAModel = IPAModel;
        this.fileService = fileService;
        this.repaymentService = repaymentService;
        this.logger = (0, winston_service_1.default)('getFinancing-service', 'getFinancing.error.log');
    }
    async createInvoice(createInvoiceDto, user, invoiceFile) {
        if (invoiceFile) {
            const invoiceUrl = await this.fileService.uploadToS3(invoiceFile, 'getFinancingInvoice');
            createInvoiceDto.invoiceFile = invoiceUrl;
        }
        const createdInvoice = new this.invoiceModel({
            ...createInvoiceDto,
            user: user._id,
        });
        try {
            return await createdInvoice.save();
        }
        catch (error) {
            this.logger.error(`Failed to upload invoice: ${error.message}`);
            throw error;
        }
    }
    async createIPA(createIpaDto, user) {
        const createdIPA = new this.IPAModel({
            ...createIpaDto,
            user: user._id,
        });
        try {
            return await createdIPA.save();
        }
        catch (error) {
            this.logger.error(`Failed to create IPA: ${error.message}`);
            throw error;
        }
    }
    async updateIPA(id, updateIpaDto, user) {
        try {
            const invoiceToUpdate = await this.IPAModel.findOne({
                _id: id,
                user: user._id,
            });
            if (!invoiceToUpdate) {
                throw new Error(`No invoice found for id ${id}`);
            }
            const principal = parseFloat(invoiceToUpdate.totalInvoiceAmount);
            const repaymentSchedule = this.repaymentService.calculateRepaymentByChoice(principal, updateIpaDto.repaymentPlan);
            invoiceToUpdate.repaymentPlan = updateIpaDto.repaymentPlan;
            await invoiceToUpdate.save();
            return repaymentSchedule;
        }
        catch (error) {
            this.logger.error(`Failed to update IPA: ${error.message}`);
            throw error;
        }
    }
};
exports.GetFinancingService = GetFinancingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(invoice_schema_1.FinancingInvoice.name)),
    __param(1, (0, mongoose_1.InjectModel)(ipa_schema_1.IPA.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        file_service_1.FileService,
        repaymentPlan_service_1.RepaymentService])
], GetFinancingService);
//# sourceMappingURL=get_financing.service.js.map