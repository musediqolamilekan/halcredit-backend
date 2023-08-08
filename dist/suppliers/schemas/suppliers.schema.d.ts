import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
export type SuppliersDocument = Suppliers & Document;
export declare class Suppliers {
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
    contact: string;
    user: User;
}
export declare const SuppliersSchema: mongoose.Schema<Suppliers, mongoose.Model<Suppliers, any, any, any, mongoose.Document<unknown, any, Suppliers> & Suppliers & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Suppliers, mongoose.Document<unknown, {}, Suppliers> & Suppliers & {
    _id: mongoose.Types.ObjectId;
}>;
