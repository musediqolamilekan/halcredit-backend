import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type ApplicationDocument = Application & Document;

@Schema()
export class Application {
  @Prop({ required: true })
  applicationID: string;

  @Prop({ required: true })
  eligibilityStatus: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
