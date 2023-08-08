import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
export type ContactDocument = Contact & Document;
export declare class Contact {
    topic: string;
    message: string;
    user: User;
}
export declare const ContactSchema: mongoose.Schema<Contact, mongoose.Model<Contact, any, any, any, mongoose.Document<unknown, any, Contact> & Contact & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Contact, mongoose.Document<unknown, {}, Contact> & Contact & {
    _id: mongoose.Types.ObjectId;
}>;
