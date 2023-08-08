import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
export type IPADocument = IPA & Document;
export declare class IPA {
    totalInvoiceAmount: string;
    purchaseDuration: string;
    averageProfitNaira: string;
    averageProfitPtg: string;
    salesDuration: string;
    repaymentPlan: string;
    user: User;
}
export declare const IPASchema: mongoose.Schema<IPA, mongoose.Model<IPA, any, any, any, mongoose.Document<unknown, any, IPA> & IPA & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IPA, mongoose.Document<unknown, {}, IPA> & IPA & {
    _id: mongoose.Types.ObjectId;
}>;
