import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NewCardDocument = NewCard & Document;

@Schema()
export class NewCard {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  cardNumber: string;

  @Prop({ required: true })
  expiryDate: string;

  @Prop({ required: true })
  cvv: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId: Types.ObjectId;
}

export const NewCardSchema = SchemaFactory.createForClass(NewCard);
