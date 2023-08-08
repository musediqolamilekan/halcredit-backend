import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type IPADocument = IPA & Document;

@Schema()
export class IPA {
  @Prop({ required: true })
  totalInvoiceAmount: string;

  @Prop({ required: true })
  purchaseDuration: string;

  @Prop({ required: true })
  averageProfitNaira: string;

  @Prop({ required: true })
  averageProfitPtg: string;

  @Prop({ required: true })
  salesDuration: string;

  @Prop()
  repaymentPlan: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const IPASchema = SchemaFactory.createForClass(IPA);
