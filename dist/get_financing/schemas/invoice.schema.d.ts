import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
export type FinancingInvoiceDocument = FinancingInvoice & Document;
export declare class FinancingInvoice {
    supplierName: string;
    contactPerson: string;
    phoneNumber: string;
    amount: string;
    description: string;
    invoiceFile: string;
    user: User;
}
export declare const FinancingInvoiceSchema: mongoose.Schema<FinancingInvoice, mongoose.Model<FinancingInvoice, any, any, any, mongoose.Document<unknown, any, FinancingInvoice> & FinancingInvoice & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, FinancingInvoice, mongoose.Document<unknown, {}, FinancingInvoice> & FinancingInvoice & {
    _id: mongoose.Types.ObjectId;
}>;
