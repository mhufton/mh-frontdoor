import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uuid from 'uuid';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ default: uuid.v4 })
  id: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ default: Date.now })
  dateCreated: Date;

  @Prop()
  summary: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
