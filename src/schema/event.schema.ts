import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CommentSchema } from './comment.schema';
import { DescriptionSchema } from './sub/description.schema';
import { LocationSchema } from './sub/location.schema';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Event extends Document {
  @Prop({ type: String, required: true })
  titel: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  user!: User;

  @Prop({ type: DescriptionSchema, required: true })
  description: Description;

  //#TODO should be independent
  @Prop({ type: Number })
  likes: number;

  @Prop({ type: [CommentSchema], default: [] })
  comments: IComment[];

  @Prop({ type: Date })
  start_date: Date;

  @Prop({ type: Date })
  end_date: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
  people_joined: User[];

  @Prop({ type: Number })
  max_capacity: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);
