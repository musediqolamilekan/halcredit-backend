import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type BankStatementsDocument = BankStatements & Document;

@Schema()
export class BankStatements {
  @Prop({ required: true })
  statement: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export const BankStatementsSchema =
  SchemaFactory.createForClass(BankStatements);
