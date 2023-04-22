import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uuid from 'uuid';

export type SummaryDocument = Summary & Document;

@Schema()
export class Summary {
  @Prop({ default: uuid.v4 })
  id: string;

  @Prop()
  summary: string;

  @Prop()
  tags: string[];

  @Prop({ default: Date.now })
  dateCreated: Date;

  @Prop()
  ownerId: string;
}

export const SummarySchema = SchemaFactory.createForClass(Summary);
