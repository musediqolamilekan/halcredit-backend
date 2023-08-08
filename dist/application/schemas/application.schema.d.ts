import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
export type ApplicationDocument = Application & Document;
export declare class Application {
    applicationID: string;
    eligibilityStatus: string;
    user: User;
}
export declare const ApplicationSchema: mongoose.Schema<Application, mongoose.Model<Application, any, any, any, mongoose.Document<unknown, any, Application> & Application & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Application, mongoose.Document<unknown, {}, Application> & Application & {
    _id: mongoose.Types.ObjectId;
}>;
