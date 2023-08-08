import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type FinancingInvoiceDocument = FinancingInvoice & Document;

@Schema()
export class FinancingInvoice {
  @Prop({ required: true })
  supplierName: string;

  @Prop({ required: true })
  contactPerson: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  amount: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  invoiceFile: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const FinancingInvoiceSchema =
  SchemaFactory.createForClass(FinancingInvoice);
