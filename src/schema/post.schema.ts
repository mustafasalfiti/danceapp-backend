import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CommentSchema } from './comment.schema';
import { DescriptionSchema } from './sub/description.schema';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name })
  user!: User;

  @Prop({ type: DescriptionSchema, required: true })
  description: Description;

  @Prop({ type: [CommentSchema], default: [] })
  comments: IComment[];
  //#TODO should be independent
  @Prop({ type: Number })
  likes: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
