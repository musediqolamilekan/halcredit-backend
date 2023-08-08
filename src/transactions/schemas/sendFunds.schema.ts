import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SendFundsDocument = SendFunds & Document;

@Schema()
export class SendFunds {
  @Prop({ required: true })
  bankName: string;

  @Prop({ required: true })
  accNumber: string;

  @Prop({ required: true })
  accName: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId: Types.ObjectId;
}

export const SendFundsSchema = SchemaFactory.createForClass(SendFunds);
