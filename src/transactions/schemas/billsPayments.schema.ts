import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BillsPaymentsDocument = BillsPayments & Document;

@Schema()
export class BillsPayments {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId: Types.ObjectId;
}

export const BillsPaymentsSchema = SchemaFactory.createForClass(BillsPayments);
