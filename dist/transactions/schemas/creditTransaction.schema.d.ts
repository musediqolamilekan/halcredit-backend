import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
export type CreditTransactionDocument = CreditTransaction & Document;
export declare class CreditTransaction {
    transactionTime: string;
    referenceNumber: number;
    amount: string;
    type: string;
    user: User;
}
export declare const CreditTransactionSchema: mongoose.Schema<CreditTransaction, mongoose.Model<CreditTransaction, any, any, any, mongoose.Document<unknown, any, CreditTransaction> & CreditTransaction & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, CreditTransaction, mongoose.Document<unknown, {}, CreditTransaction> & CreditTransaction & {
    _id: mongoose.Types.ObjectId;
}>;
