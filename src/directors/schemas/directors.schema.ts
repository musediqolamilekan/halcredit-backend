import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type DirectorsDocument = Directors & Document;

@Schema()
export class Directors {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  photo: string;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  sharesPercentage: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const DirectorsSchema = SchemaFactory.createForClass(Directors);
