import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
export type InventoryDocument = Inventory & Document;
export declare class Inventory {
    name: string;
    unit: string;
    costPrice: number;
    vat: number;
    category: string;
    quantity: number;
    sellingPrice: number;
    discount: number;
    minReorder: number;
    user: User;
}
export declare const InventorySchema: mongoose.Schema<Inventory, mongoose.Model<Inventory, any, any, any, mongoose.Document<unknown, any, Inventory> & Inventory & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Inventory, mongoose.Document<unknown, {}, Inventory> & Inventory & {
    _id: mongoose.Types.ObjectId;
}>;
