import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
export type ContractsDocument = Contracts & Document;
export declare class Contracts {
    businessName: string;
    companyEmail: string;
    businessType: string;
    startedDate: Date;
    officeNumber: string;
    streetName: string;
    city: string;
    state: string;
    companyWebsite: string;
    industry: string;
    description: string;
    bankStatement: string;
    supplierInvoice: string;
    user: User;
}
export declare const ContractsSchema: mongoose.Schema<Contracts, mongoose.Model<Contracts, any, any, any, mongoose.Document<unknown, any, Contracts> & Contracts & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Contracts, mongoose.Document<unknown, {}, Contracts> & Contracts & {
    _id: mongoose.Types.ObjectId;
}>;
