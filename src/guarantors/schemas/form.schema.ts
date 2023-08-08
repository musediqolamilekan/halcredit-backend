import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FormDocument = Form & Document;

@Schema({
  timestamps: true,
})
export class Form {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  BVN: string;

  @Prop({ required: true })
  workAddress: string;

  @Prop({ required: true })
  workPlaceNumber: string;

  @Prop({ required: true })
  workPlaceContact: string;

  proofOfAddress?: string;

  proofOfIdentification?: string;
}

export const FormSchema = SchemaFactory.createForClass(Form);
