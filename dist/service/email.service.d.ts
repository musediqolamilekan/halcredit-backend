import { Guarantor } from 'src/guarantors/schemas/guarantors.schema';
import { User } from 'src/user/schemas/user.schema';
export declare class EmailService {
    sendEmailVerification(user: User, verificationLink: string): Promise<void>;
    sendForgotPasswordEmail(user: User, resetToken: string): Promise<void>;
    sendGuarantorLink(guarantor: Guarantor, guarantorLink: string): Promise<void>;
}
