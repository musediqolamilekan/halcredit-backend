import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BankTransferDocument = BankTransfer & Document;

@Schema()
export class BankTransfer {
  @Prop({ required: true })
  accName: string;

  @Prop({ required: true })
  bankName: string;

  @Prop({ required: true })
  accNumber: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId: Types.ObjectId;
}

export const BankTransferSchema = SchemaFactory.createForClass(BankTransfer);
