import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Room extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  users: [{ type: Types.ObjectId, ref: 'User'}];

  @Prop({ required: true })
  creator: { type: Types.ObjectId, ref: 'User'};

}

export const RoomSchema = SchemaFactory.createForClass(Room);
