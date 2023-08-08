import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type CreditTransactionDocument = CreditTransaction & Document;

@Schema({ timestamps: { createdAt: 'transactionDate' } })
export class CreditTransaction {
  @Prop({ type: String, default: () => Date.now().toString() })
  transactionTime: string;

  @Prop({ default: () => Math.floor(100000000 + Math.random() * 900000000) })
  referenceNumber: number;

  @Prop({ required: true })
  amount: string;

  @Prop({
    type: String,
    enum: ['credit disbursed', 'credit paid'],
    required: true,
  })
  type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const CreditTransactionSchema =
  SchemaFactory.createForClass(CreditTransaction);
