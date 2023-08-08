import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type GuarantorDocument = Guarantor & Document;

@Schema()
export class Guarantor {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  whatsappNumber: string;

  @Prop()
  guarantorToken: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const GuarantorSchema = SchemaFactory.createForClass(Guarantor);
