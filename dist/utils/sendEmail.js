"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const config_1 = require("@nestjs/config");
const winston_service_1 = require("../service/winston.service");
const common_1 = require("@nestjs/common");
const configService = new config_1.ConfigService();
const logger = (0, winston_service_1.default)('email', 'email-error.log');
async function sendEmail(email, templateName, subject, templateVariables) {
    try {
        ejs.renderFile(path.resolve(process.cwd(), 'views', templateName + '.ejs'), templateVariables, async (err, data) => {
            if (err) {
                logger.error(`ejs.renderFile failed for email: ${email}`, err);
                throw new common_1.InternalServerErrorException('Unable to send ' + subject + ' email');
            }
            else {
                const transporter = nodemailer.createTransport({
                    host: 'smtp.zoho.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: configService.get('HALCREDIT_EMAIL'),
                        pass: configService.get('HALCREDIT_PASS'),
                    },
                });
                const mailOptions = {
                    from: '"Halcredit" <' +
                        configService.get('HALCREDIT_EMAIL') +
                        '>',
                    to: email,
                    subject: subject,
                    html: data,
                };
                await transporter.sendMail(mailOptions);
                logger.info('Email sent: ' + email);
            }
        });
    }
    catch (error) {
        logger.error(`sendEmail failed for email: ${email}`, error);
        throw new common_1.InternalServerErrorException('Failed to send ' + subject + ' email');
    }
}
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map