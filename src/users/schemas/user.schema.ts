import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id?: string;
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['Admin', 'Viewer'], default: 'Viewer' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
