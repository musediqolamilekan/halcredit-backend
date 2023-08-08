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
exports.InvestorService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const investor_schema_1 = require("./schemas/investor.schema");
const ejs = require("ejs");
const path = require("path");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const config_1 = require("@nestjs/config");
const winston_service_1 = require("../service/winston.service");
let InvestorService = exports.InvestorService = class InvestorService {
    constructor(investorModel, configService) {
        this.investorModel = investorModel;
        this.configService = configService;
        this.logger = (0, winston_service_1.default)('investor', 'investor.error.log');
    }
    async getInvestorByToken(token) {
        try {
            const foundInvestor = await this.investorModel.findOne({ token });
            if (!foundInvestor) {
                throw new common_1.NotFoundException(`Investor with token ${token} not found`);
            }
            return foundInvestor;
        }
        catch (error) {
            this.logger.error(`Failed to get investor: ${error.message}`);
            throw error;
        }
    }
    async create(createInvestorDto) {
        const createdInvestor = new this.investorModel({
            ...createInvestorDto,
        });
        try {
            let savedInvestor = await createdInvestor.save();
            savedInvestor = await this.investorModel.findById(savedInvestor._id);
            try {
                await this.sendEmail(savedInvestor.email, savedInvestor.firstName, savedInvestor._id);
            }
            catch (error) {
                this.logger.error(`Failed to send email to user: ${error.message}`);
            }
            return savedInvestor;
        }
        catch (error) {
            this.logger.error(`Failed to create investor: ${error.message}`);
            throw error;
        }
    }
    async sendEmail(email, firstName, investorId) {
        try {
            const verificationToken = crypto.randomBytes(10).toString('hex');
            const verificationLink = `${this.configService.get('INVEST_MAIL_LINK')}?token=${verificationToken}`;
            await this.investorModel.findByIdAndUpdate(investorId, {
                token: verificationToken,
            }, { new: true });
            ejs.renderFile(path.resolve(process.cwd(), 'views', 'investEmail.ejs'), { firstName: firstName, verificationLink: verificationLink }, async (err, data) => {
                if (err) {
                    this.logger.error(`ejs.renderFile failed for email: ${JSON.stringify(email)}`, err);
                    throw new common_1.InternalServerErrorException('Unable to send email verification email' + err);
                }
                else {
                    const transporter = nodemailer.createTransport({
                        host: 'smtp.zoho.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: this.configService.get('INVEST_MAIL_HOST'),
                            pass: this.configService.get('INVEST_MAIL_PASS'),
                        },
                    });
                    const mailOptions = {
                        from: '"Halcredit Investment" <' +
                            this.configService.get('INVEST_MAIL_HOST') +
                            '>',
                        to: email,
                        bcc: this.configService.get('INVEST_MAIL_HOST'),
                        subject: 'Next Steps',
                        html: data,
                    };
                    await transporter.sendMail(mailOptions);
                    this.logger.info('Email sent: ' + email);
                }
            });
        }
        catch (error) {
            this.logger.error(`sendVerificationToken failed for email: ${JSON.stringify(email)}`, error);
            throw new common_1.InternalServerErrorException('Failed to process send verification token request');
        }
    }
    async updateInvestor(updateInvestorDto, token) {
        try {
            const updatedInvestor = await this.investorModel.findOneAndUpdate({ token: token }, updateInvestorDto, { new: true });
            if (!updatedInvestor) {
                throw new common_1.NotFoundException(`No investor found with token ${token}`);
            }
            try {
                await this.sendEmailToAdmin(this.configService.get('INVEST_MAIL_HOST'), updatedInvestor.email, updatedInvestor.firstName, updatedInvestor.lastName, updatedInvestor._id, updatedInvestor.amount, updatedInvestor.passportID, updatedInvestor.countryPassport, updatedInvestor.country, updatedInvestor.gender, updatedInvestor.dateOfBirth, updatedInvestor.phone);
            }
            catch (error) {
                this.logger.error(`Failed to send account update notification email to admin: ${error.message}`);
            }
            return updatedInvestor;
        }
        catch (error) {
            this.logger.error(`Failed to update investor: ${error.message}`);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Unexpected error occurred when updating the investor');
            }
        }
    }
    async sendEmailToAdmin(adminEmail, newUserEmail, firstName, lastName, investorId, amount, passportID, countryPassport, country, gender, dateOfBirth, phone) {
        try {
            ejs.renderFile(path.resolve(process.cwd(), 'views', 'adminNotificationEmail.ejs'), {
                fullName: firstName + ' ' + lastName,
                email: newUserEmail,
                investorId,
                amount,
                passportID,
                countryPassport,
                country,
                gender,
                dateOfBirth,
                phone,
            }, async (err, data) => {
                if (err) {
                    this.logger.error(`ejs.renderFile failed for email: ${JSON.stringify(newUserEmail)}`, err);
                    throw new common_1.InternalServerErrorException('Unable to send new user notification email to admin');
                }
                else {
                    const transporter = nodemailer.createTransport({
                        host: 'smtp.zoho.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: this.configService.get('INVEST_MAIL_HOST'),
                            pass: this.configService.get('INVEST_MAIL_PASS'),
                        },
                    });
                    const mailOptions = {
                        from: '"Halcredit Investment" <' +
                            this.configService.get('INVEST_MAIL_HOST') +
                            '>',
                        to: adminEmail,
                        subject: 'New User Notification',
                        html: data,
                    };
                    await transporter.sendMail(mailOptions);
                    this.logger.info('New user notification email sent to admin: ' + adminEmail);
                }
            });
        }
        catch (error) {
            this.logger.error(`sendEmailToAdmin failed for email: ${JSON.stringify(newUserEmail)}`, error);
            throw new common_1.InternalServerErrorException('Failed to process send new user notification email request');
        }
    }
};
exports.InvestorService = InvestorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(investor_schema_1.Investor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], InvestorService);
//# sourceMappingURL=investor.service.js.map