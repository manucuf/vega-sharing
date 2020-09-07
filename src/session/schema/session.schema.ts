import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Session extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  creator: any;

  @Prop({ type: Types.ObjectId, ref: 'Room' })
  room: any;

}

export const SessionSchema = SchemaFactory.createForClass(Session);
