"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const sendEmail_1 = require("../utils/sendEmail");
let EmailService = exports.EmailService = class EmailService {
    async sendEmailVerification(user, verificationLink) {
        await (0, sendEmail_1.sendEmail)(user.email, 'emailVerification', 'Email Verification', {
            user: user,
            verificationLink: verificationLink,
        });
    }
    async sendForgotPasswordEmail(user, resetToken) {
        await (0, sendEmail_1.sendEmail)(user.email, 'forgotPassword', 'Password Reset Request', {
            user: user,
            resetToken: resetToken,
        });
    }
    async sendGuarantorLink(guarantor, guarantorLink) {
        await (0, sendEmail_1.sendEmail)(guarantor.email, 'guarantorEmail', 'Guarantor Notification', {
            guarantor: guarantor,
            guarantorLink: guarantorLink,
        });
    }
};
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)()
], EmailService);
//# sourceMappingURL=email.service.js.map