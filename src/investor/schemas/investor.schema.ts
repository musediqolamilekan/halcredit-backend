import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InvestorDocument = Investor & Document;

@Schema()
export class Investor {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  amount: string;

  @Prop()
  phone: string;

  @Prop()
  token: string;

  @Prop()
  gender: string;

  @Prop()
  passportID: string;

  @Prop()
  countryPassport: string;

  @Prop()
  country: string;

  @Prop()
  dateOfBirth: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export const InvestorSchema = SchemaFactory.createForClass(Investor);
