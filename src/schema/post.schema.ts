import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Types } from 'mongoose';
import { CommentSchema } from './comment.schema';
import { DescriptionSchema } from './sub/description.schema';
import { LocationSchema } from './sub/location.schema';
import { User } from './user.schema';


@Schema()
export class Post extends Document {
    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user_id: Types.ObjectId;

    @Prop({ type: DescriptionSchema, required: true })
    description: Description;

    @Prop({ type: LocationSchema, required: true })
    location: ILocation;

    @Prop({ type: [CommentSchema] , default:[] })
    comments: IComment[];

    //#TODO should be independent
    @Prop({ type: [Types.ObjectId] , default:[] })
    likes: Types.ObjectId[];

    @Prop({ type: Date, default: Date.now() })
    createdAt: Date;
    
    @Prop({type: [ Types.ObjectId ] , default:[]})
    vote_up: Types.ObjectId[];

    @Prop({type: [ Types.ObjectId ] , default:[]})
    vote_down: Types.ObjectId[];
}

export const PostSchema = SchemaFactory.createForClass(Post);