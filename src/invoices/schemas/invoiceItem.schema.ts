import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InvoiceItemDocument = InvoiceItem & Document;

@Schema()
export class InvoiceItem {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  discount: number;

  @Prop({ required: true })
  vat: number;

  @Prop({ required: true })
  totalPrice: number;
}

export const InvoiceItemSchema = SchemaFactory.createForClass(InvoiceItem);
