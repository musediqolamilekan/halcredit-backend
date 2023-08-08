import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type InventoryDocument = Inventory & Document;

@Schema()
export class Inventory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  unit: string;

  @Prop({ required: true })
  costPrice: number;

  @Prop({ required: true })
  vat: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  sellingPrice: number;

  @Prop({ required: true })
  discount: number;

  @Prop({ required: true })
  minReorder: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
