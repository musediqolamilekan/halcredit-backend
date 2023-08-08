import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EligibilityDocument = Eligibility & Document;

@Schema()
export class Eligibility {
  @Prop({ required: true })
  email: string;

  @Prop()
  amountExpected: string;

  @Prop()
  timeInBusiness: string;

  @Prop()
  monthlyIncome: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export const EligibilitySchema = SchemaFactory.createForClass(Eligibility);
