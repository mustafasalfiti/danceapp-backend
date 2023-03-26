import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import {  Document } from 'mongoose';

@Schema()
export class Description extends Document {
    @Prop({type:[String]})
    images:string[];

    @Prop({type:String})
    content:String;
}

export const DescriptionSchema = SchemaFactory.createForClass(Description);


