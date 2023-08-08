import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  [x: string]: any;
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  phone: string;

  @Prop({
    unique: [true, 'User email already exist'],
    required: [true, 'Please enter your email'],
  })
  email: string;

  @Prop()
  activated: boolean;

  @Prop()
  profilePicture: string;

  @Prop()
  status: string;

  @Prop()
  bank: string;

  @Prop()
  bankCode: string;

  @Prop()
  accountNo: string;

  @Prop()
  isVerified: boolean;

  @Prop()
  isEligible: boolean;

  @Prop()
  password: string;

  @Prop()
  businessName: string;

  @Prop()
  industry: string;

  @Prop()
  description: string;

  @Prop()
  officeNumber: string;

  @Prop()
  address: string;

  @Prop()
  state: string;

  @Prop()
  city: string;

  @Prop()
  bvn: string;

  @Prop()
  country: string;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  gender: string;

  @Prop()
  passwordResetToken: string;

  @Prop()
  passwordResetExpires: Date;

  @Prop()
  emailVerificationToken: string;

  @Prop()
  startedDate: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  transactionPin: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
