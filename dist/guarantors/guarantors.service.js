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
exports.GuarantorsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const winston_service_1 = require("../service/winston.service");
const guarantors_schema_1 = require("./schemas/guarantors.schema");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const config_1 = require("@nestjs/config");
const signUp_schema_1 = require("./schemas/signUp.schema");
const form_schema_1 = require("./schemas/form.schema");
const file_service_1 = require("../service/file.service");
const email_service_1 = require("../service/email.service");
let GuarantorsService = exports.GuarantorsService = class GuarantorsService {
    constructor(guarantorModel, signUpModel, formModel, configService, fileService, emailService) {
        this.guarantorModel = guarantorModel;
        this.signUpModel = signUpModel;
        this.formModel = formModel;
        this.configService = configService;
        this.fileService = fileService;
        this.emailService = emailService;
        this.logger = (0, winston_service_1.default)('guarantor-service', 'guarantor.error.log');
    }
    async createGuarantor(signUpDto) {
        const { email, password } = signUpDto;
        const saltRounds = parseInt(this.configService.get('BCRYPT_SALT_ROUNDS')) || 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return await this.signUpModel.create({
            email,
            password: hashedPassword,
            createdAt: new Date(),
        });
    }
    async excludePassword(guarantorId) {
        return await this.signUpModel.findById(guarantorId).select('-password');
    }
    async create(createGuarantorDto, user) {
        const createdGuarantor = new this.guarantorModel({
            ...createGuarantorDto,
            user: user._id,
        });
        try {
            const savedGuarantor = await createdGuarantor.save();
            const guarantorToken = await this.sendGuarantorEmail(savedGuarantor._id);
            return {
                ...savedGuarantor.toObject(),
                guarantorToken,
            };
        }
        catch (error) {
            console.log(error);
            this.logger.error(`Failed to create guarantor: ${error.message}`);
            throw error;
        }
    }
    async findAll(user) {
        try {
            return await this.guarantorModel.find({ user: user._id });
        }
        catch (error) {
            this.logger.error(`Failed to get guarantor: ${error.message}`);
            throw error;
        }
    }
    async signUp(signUpDto) {
        const { email } = signUpDto;
        const existingUser = await this.signUpModel.findOne({ email });
        if (existingUser) {
            this.logger.error(`User already exists: ${JSON.stringify(email)}`);
            throw new common_1.ConflictException('Guarantor already exists');
        }
        try {
            let user = await this.createGuarantor(signUpDto);
            user = await this.excludePassword(user._id);
            return { message: 'Success', user };
        }
        catch (error) {
            this.logger.error(`Sign up failed for email: ${JSON.stringify(email)}`, error);
            throw new common_1.InternalServerErrorException('Sign Up Failed');
        }
    }
    async createForm(createFormDto, guarantorToken, proofOfAddressFile, proofOfIdentificationFile) {
        try {
            const guarantor = await this.guarantorModel.findOne({ guarantorToken });
            if (!guarantor) {
                throw new common_1.NotFoundException('Invalid guarantor token');
            }
            if (proofOfAddressFile) {
                const proofOfAddressUrl = await this.fileService.uploadToS3(proofOfAddressFile, 'proofOfAddress');
                createFormDto.proofOfAddress = proofOfAddressUrl;
            }
            if (proofOfIdentificationFile) {
                const proofOfIdentificationUrl = await this.fileService.uploadToS3(proofOfIdentificationFile, 'proofOfIdentification');
                createFormDto.proofOfIdentification = proofOfIdentificationUrl;
            }
            const createdForm = new this.formModel({
                ...createFormDto,
                user: guarantor.user._id,
            });
            return await createdForm.save();
        }
        catch (error) {
            console.log(error);
            this.logger.error(`Failed to create form: ${error.message}`);
            throw error;
        }
    }
    async sendGuarantorEmail(guarantorId) {
        try {
            const guarantorToken = crypto.randomBytes(5).toString('hex');
            const guarantor = await this.guarantorModel.findById(guarantorId);
            if (!guarantor) {
                throw new common_1.UnauthorizedException('Invalid guarantor id');
            }
            guarantor.guarantorToken = guarantorToken;
            await guarantor.save();
            const guarantorLink = `${this.configService.get('VERIFICATION_BASE_URL')}?guarantorToken=${guarantorToken}`;
            this.emailService.sendGuarantorLink(guarantor, guarantorLink);
            return guarantorToken;
        }
        catch (error) {
            this.logger.error(`sendGuarantorEmail failed for guarantor id: ${JSON.stringify(guarantorId)}`, error);
            throw new common_1.InternalServerErrorException('Failed to process guarantor verification token request');
        }
    }
};
exports.GuarantorsService = GuarantorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(guarantors_schema_1.Guarantor.name)),
    __param(1, (0, mongoose_2.InjectModel)(signUp_schema_1.SignUp.name)),
    __param(2, (0, mongoose_2.InjectModel)(form_schema_1.Form.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        config_1.ConfigService,
        file_service_1.FileService,
        email_service_1.EmailService])
], GuarantorsService);
//# sourceMappingURL=guarantors.service.js.map