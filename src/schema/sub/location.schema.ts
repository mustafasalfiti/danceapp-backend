import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Location extends Document {
    @Prop({type:String , default:"Point"})
    type:string

    @Prop({type:[Number] , index:'2dsphere'})
    coordinates:number[]
}

export const LocationSchema = SchemaFactory.createForClass(Location);


