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
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const contact_schema_1 = require("./schemas/contact.schema");
const nodemailer = require("nodemailer");
const winston = require("winston");
const config_1 = require("@nestjs/config");
let ContactService = exports.ContactService = class ContactService {
    constructor(contactModel, configService) {
        this.contactModel = contactModel;
        this.configService = configService;
        this.logger = winston.createLogger({
            level: 'error',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            defaultMeta: { service: 'user-service' },
            transports: [
                new winston.transports.File({
                    filename: 'error.log',
                    level: 'error',
                }),
            ],
        });
    }
    async create(createContactDto, user) {
        const createdContact = new this.contactModel({
            ...createContactDto,
            user: user._id,
        });
        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 465,
            secure: true,
            auth: {
                user: this.configService.get('HALCREDIT_EMAIL'),
                pass: this.configService.get('HALCREDIT_PASS'),
            },
        });
        const mailOptions = {
            from: user.email,
            to: this.configService.get('HALCREDIT_EMAIL'),
            subject: createdContact.topic,
            text: createdContact.message,
        };
        try {
            await transporter.sendMail(mailOptions);
            this.logger.info(`Email sent to: ${mailOptions.to}`);
            return await createdContact.save();
        }
        catch (error) {
            this.logger.error(`Failed to send email: ${error.message}`);
            throw error;
        }
    }
};
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(contact_schema_1.Contact.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], ContactService);
//# sourceMappingURL=contact.service.js.map