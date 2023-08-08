import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SignUpDocument = SignUp & Document;

@Schema({
  timestamps: true,
})
export class SignUp {
  [x: string]: any;
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const SignUpSchema = SchemaFactory.createForClass(SignUp);
