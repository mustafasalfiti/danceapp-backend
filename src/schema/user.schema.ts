import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({type:Object})
  fullname: Fullname;

  @Prop({ unique: true, required: true })
  phone_number: string;

  @Prop({required:true})
  password:string;

  @Prop({ type: Date })
  birthday: Date;


  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ unique: true })
  email_address: string;

}

export const UserSchema = SchemaFactory.createForClass(User);


