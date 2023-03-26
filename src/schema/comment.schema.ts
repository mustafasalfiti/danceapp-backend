import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Types } from 'mongoose';

@Schema()
export class Comment extends Document {
    @Prop({type:Types.ObjectId , required:true})
    user_id:Types.ObjectId;

    @Prop({type:Types.ObjectId , required:true})
    post_id:Types.ObjectId;

    @Prop({type:String , required:true})
    content:string;

    //#TODO should be independent
    @Prop({ type: [Types.ObjectId]  , default:[]})
    likes: Types.ObjectId[];
    
    @Prop({ type: Date, default: Date.now() })
    createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);


