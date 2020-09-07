import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema()
export class Session extends Document {
  @Prop({ required: true })
  name: string;
  
  @Prop()
  description: string;

  //@Prop({ required: true })
  //@Prop()
  //creator: { type: Types.ObjectId, ref: 'User'};
  @Prop({ type: Types.ObjectId, ref: 'User' })
  creatorId: any;
  //@Prop({ type: Types.ObjectId, ref: 'Room' })
  //@Prop()
  //room: any;

}

export const SessionSchema = SchemaFactory.createForClass(Session);
