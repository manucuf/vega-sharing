import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Session extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  creator: { type: Types.ObjectId, ref: 'User'};

  @Prop({ required: true })
  room: { type: Types.ObjectId, ref: 'Room'};

}

export const SessionSchema = SchemaFactory.createForClass(Session);
