import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type InvoiceDocument = Invoice & Document;

@Schema()
export class Invoice {
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  customerEmail: string;

  @Prop({ required: true })
  billFrom: string;

  @Prop({ required: true })
  billTo: string;

  @Prop({ required: true })
  billingAddress: string;

  @Prop({ required: true })
  issuedOn: Date;

  @Prop({ required: true })
  dueOn: Date;

  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
