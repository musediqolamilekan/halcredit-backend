import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class MailingList {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop()
  areaOfInterest: string;

  @Prop()
  startTime: string;

  @Prop()
  amount: string;

  @Prop()
  infoSource: string;

  @Prop()
  referral: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const MailingListSchema = SchemaFactory.createForClass(MailingList);
