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
exports.GuarantorsController = void 0;
const common_1 = require("@nestjs/common");
const guarantors_service_1 = require("./guarantors.service");
const create_guarantor_dto_1 = require("./dto/create-guarantor.dto");
const jwt_guard_1 = require("../service/jwt.guard");
const winston_service_1 = require("../service/winston.service");
const signUp_dto_1 = require("./dto/signUp.dto");
const form_dto_1 = require("./dto/form.dto");
const platform_express_1 = require("@nestjs/platform-express");
let GuarantorsController = exports.GuarantorsController = class GuarantorsController {
    constructor(guarantorsService) {
        this.guarantorsService = guarantorsService;
        this.logger = (0, winston_service_1.default)('guarantor', 'guarantor.error.log');
    }
    handleHttpException(error, message, statusCode) {
        this.logger.error(message, error);
        throw new common_1.HttpException(message || error.message, statusCode);
    }
    async handleGuarantorProcess(guarantorPromise, failureMessage, statusCode) {
        try {
            return await guarantorPromise;
        }
        catch (error) {
            console.log(error);
            this.handleHttpException(error, failureMessage, statusCode);
        }
    }
    async create(req, createGuarantorDto) {
        return this.handleGuarantorProcess(this.guarantorsService.create(createGuarantorDto, req.user), 'Failed to create inventory.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async findAll(req) {
        return this.handleGuarantorProcess(this.guarantorsService.findAll(req.user), 'Failed to get all inventories.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async signUp(signUpDto) {
        return this.handleGuarantorProcess(this.guarantorsService.signUp(signUpDto), 'Registration failed.', common_1.HttpStatus.BAD_REQUEST);
    }
    async createForm(files, req, createFormDto, guarantorToken) {
        const proofOfAddressFile = files.proofOfAddress
            ? files.proofOfAddress[0]
            : null;
        const proofOfIdentificationFile = files.proofOfIdentification ? files.proofOfIdentification[0] : null;
        return this.handleGuarantorProcess(this.guarantorsService.createForm(createFormDto, guarantorToken, proofOfAddressFile, proofOfIdentificationFile), 'Failed to create contract.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_guarantor_dto_1.CreateGuarantorDto]),
    __metadata("design:returntype", Promise)
], GuarantorsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/getAll'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GuarantorsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signUp_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], GuarantorsController.prototype, "signUp", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/create/:guarantorToken'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'proofOfAddress', maxCount: 1 },
        { name: 'proofOfIdentification', maxCount: 1 },
    ])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(3, (0, common_1.Param)('guarantorToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, form_dto_1.CreateFormDto, String]),
    __metadata("design:returntype", Promise)
], GuarantorsController.prototype, "createForm", null);
exports.GuarantorsController = GuarantorsController = __decorate([
    (0, common_1.Controller)('guarantors'),
    __metadata("design:paramtypes", [guarantors_service_1.GuarantorsService])
], GuarantorsController);
//# sourceMappingURL=guarantors.controller.js.map