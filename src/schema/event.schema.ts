import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CommentSchema } from './comment.schema';
import { DescriptionSchema } from './sub/description.schema';
import { LocationSchema } from './sub/location.schema';

@Schema()
export class Event extends Document {
    @Prop({ type: String })
    event_type: string

    @Prop({ type: String , required: true })
    titel: string

    @Prop({ type: Types.ObjectId, required: true })
    createdBy: Types.ObjectId

    @Prop({ type: DescriptionSchema, required: true })
    description: Description;

    @Prop({ type: LocationSchema, required: true })
    location: ILocation;

    //#TODO should be independent
    @Prop({ type: [Types.ObjectId], default: [] })
    likes: Types.ObjectId[];

    @Prop({ type: [CommentSchema], default: [] })
    comments: Comment[];

    @Prop({ type: Date })
    start_date: Date;

    @Prop({ type: Date })
    end_date: Date;

    @Prop({ type: [Types.ObjectId] })
    people_joined: Types.ObjectId[];

    @Prop({ type: Number })
    people_required: number;

    //#TODO create a category and interests
    @Prop({ type: Object })
    category: {};

}

export const EventSchema = SchemaFactory.createForClass(Event);