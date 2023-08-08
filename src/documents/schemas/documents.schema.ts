import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DocumentsDocument = Documents & Document;

@Schema()
export class Documents {
  @Prop({ required: true })
  businessReg: string;

  @Prop({ required: true })
  tin: string;

  @Prop({ required: true })
  certificate: string;

  @Prop({ required: true })
  utilityBill: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export const DocumentsSchema = SchemaFactory.createForClass(Documents);
