import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {
  IsNotEmpty,
  IsEmail,
  IsUrl,
  IsDate,
  IsPhoneNumber,
} from 'class-validator';
import { User } from 'src/user/schemas/user.schema';

export type ContractsDocument = Contracts & Document;

@Schema()
export class Contracts {
  @Prop({ required: true })
  @IsNotEmpty()
  businessName: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsEmail()
  companyEmail: string;

  @Prop({ required: true })
  @IsNotEmpty()
  businessType: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsDate()
  startedDate: Date;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsPhoneNumber(null)
  officeNumber: string;

  @Prop({ required: true })
  @IsNotEmpty()
  streetName: string;

  @Prop({ required: true })
  @IsNotEmpty()
  city: string;

  @Prop({ required: true })
  @IsNotEmpty()
  state: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsUrl()
  companyWebsite: string;

  @Prop({ required: true })
  @IsNotEmpty()
  industry: string;

  @Prop({ required: true })
  @IsNotEmpty()
  description: string;

  @Prop({ required: true })
  @IsNotEmpty()
  bankStatement: string;

  @Prop({ required: true })
  @IsNotEmpty()
  supplierInvoice: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const ContractsSchema = SchemaFactory.createForClass(Contracts);
