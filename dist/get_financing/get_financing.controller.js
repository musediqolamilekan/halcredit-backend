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
exports.GetFinancingController = void 0;
const common_1 = require("@nestjs/common");
const invoice_dto_1 = require("./dto/invoice.dto");
const get_financing_service_1 = require("./get_financing.service");
const jwt_guard_1 = require("../service/jwt.guard");
const platform_express_1 = require("@nestjs/platform-express");
const winston_service_1 = require("../service/winston.service");
const ipa_dto_1 = require("./dto/ipa.dto");
let GetFinancingController = exports.GetFinancingController = class GetFinancingController {
    constructor(getFinancingService) {
        this.getFinancingService = getFinancingService;
        this.logger = (0, winston_service_1.default)('getFinancing-service', 'getFinancing.error.log');
    }
    handleHttpException(error, message, statusCode) {
        this.logger.error(message, error);
        throw new common_1.HttpException(message || error.message, statusCode);
    }
    async handleFinancingProcess(getFinancingPromise, failureMessage, statusCode) {
        try {
            return await getFinancingPromise;
        }
        catch (error) {
            this.handleHttpException(error, failureMessage, statusCode);
        }
    }
    async create(files, req, createInvoiceDto) {
        const invoiceFile = files.invoiceFile
            ? files.invoiceFile[0]
            : null;
        return this.handleFinancingProcess(this.getFinancingService.createInvoice(createInvoiceDto, req.user, invoiceFile), 'Failed to upload invoice.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async createIPA(req, createIpaDto) {
        return this.handleFinancingProcess(this.getFinancingService.createIPA(createIpaDto, req.user), 'Failed to create inventory.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async updateIPA(id, req, updateIpaDto) {
        return this.handleFinancingProcess(this.getFinancingService.updateIPA(id, updateIpaDto, req.user), 'Failed to update IPA.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/invoice'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'invoiceFile', maxCount: 1 }])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, invoice_dto_1.CreateInvoiceDto]),
    __metadata("design:returntype", Promise)
], GetFinancingController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ipa_dto_1.CreateIpaDto]),
    __metadata("design:returntype", Promise)
], GetFinancingController.prototype, "createIPA", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/repaymentPlan/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, ipa_dto_1.UpdateIpaDto]),
    __metadata("design:returntype", Promise)
], GetFinancingController.prototype, "updateIPA", null);
exports.GetFinancingController = GetFinancingController = __decorate([
    (0, common_1.Controller)('financing'),
    __metadata("design:paramtypes", [get_financing_service_1.GetFinancingService])
], GetFinancingController);
//# sourceMappingURL=get_financing.controller.js.map