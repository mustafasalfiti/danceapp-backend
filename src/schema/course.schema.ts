import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Types } from 'mongoose';
import { CommentSchema } from './comment.schema';
import { DescriptionSchema } from './sub/description.schema';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Course extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name })
  user!: User;

  @Prop({ type: DescriptionSchema, required: true })
  description: Description;

  @Prop({ type: Number })
  cost: number;

  @Prop({ type: Number })
  max_capacity: number;

  @Prop({ type: String })
  title: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
