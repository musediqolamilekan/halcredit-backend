import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
export type DirectorsDocument = Directors & Document;
export declare class Directors {
    name: string;
    email: string;
    address: string;
    photo: string;
    id: string;
    sharesPercentage: number;
    user: User;
}
export declare const DirectorsSchema: mongoose.Schema<Directors, mongoose.Model<Directors, any, any, any, mongoose.Document<unknown, any, Directors> & Directors & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Directors, mongoose.Document<unknown, {}, Directors> & Directors & {
    _id: mongoose.Types.ObjectId;
}>;
