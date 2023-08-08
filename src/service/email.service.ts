import { Injectable } from '@nestjs/common';
import { Guarantor } from 'src/guarantors/schemas/guarantors.schema';
import { User } from 'src/user/schemas/user.schema';
import { sendEmail } from '../utils/sendEmail';

@Injectable()
export class EmailService {
  async sendEmailVerification(user: User, verificationLink: string) {
    await sendEmail(user.email, 'emailVerification', 'Email Verification', {
      user: user,
      verificationLink: verificationLink,
    });
  }

  async sendForgotPasswordEmail(user: User, resetToken: string) {
    await sendEmail(user.email, 'forgotPassword', 'Password Reset Request', {
      user: user,
      resetToken: resetToken,
    });
  }

  async sendGuarantorLink(guarantor: Guarantor, guarantorLink: string) {
    await sendEmail(
      guarantor.email,
      'guarantorEmail',
      'Guarantor Notification',
      {
        guarantor: guarantor,
        guarantorLink: guarantorLink,
      },
    );
  }
}
