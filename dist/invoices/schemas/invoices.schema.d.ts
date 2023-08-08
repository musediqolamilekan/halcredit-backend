import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
export type InvoiceDocument = Invoice & Document;
export declare class Invoice {
    customerName: string;
    customerEmail: string;
    billFrom: string;
    billTo: string;
    billingAddress: string;
    issuedOn: Date;
    dueOn: Date;
    description: string;
    user: User;
}
export declare const InvoiceSchema: mongoose.Schema<Invoice, mongoose.Model<Invoice, any, any, any, mongoose.Document<unknown, any, Invoice> & Invoice & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Invoice, mongoose.Document<unknown, {}, Invoice> & Invoice & {
    _id: mongoose.Types.ObjectId;
}>;
