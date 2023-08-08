import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
export type GuarantorDocument = Guarantor & Document;
export declare class Guarantor {
    name: string;
    email: string;
    whatsappNumber: string;
    guarantorToken: string;
    user: User;
}
export declare const GuarantorSchema: mongoose.Schema<Guarantor, mongoose.Model<Guarantor, any, any, any, mongoose.Document<unknown, any, Guarantor> & Guarantor & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Guarantor, mongoose.Document<unknown, {}, Guarantor> & Guarantor & {
    _id: mongoose.Types.ObjectId;
}>;
