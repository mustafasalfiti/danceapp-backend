import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Types } from 'mongoose';
import { Post } from './post.schema';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name })
  user!: User;

  @Prop({ type: Types.ObjectId, ref: Post.name })
  post: Post;

  @Prop({ type: String, required: true })
  content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
