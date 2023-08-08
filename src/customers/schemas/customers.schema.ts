import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CustomersDocument = Customers & Document;

@Schema()
export class Customers {
  @Prop({ required: true })
  businessName: string;

  @Prop({ required: true })
  whatsAppNo: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  contact: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId: Types.ObjectId;
}

export const CustomersSchema = SchemaFactory.createForClass(Customers);
