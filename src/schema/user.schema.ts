import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import { SexEnum } from 'src/enums/sex.enum';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: Object })
  fullname: Fullname;

  @Prop({ unique: true, required: true })
  phone_number: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Date })
  birthday: Date;

  @Prop({ enum: SexEnum })
  sex: SexEnum;

  @Prop({ unique: true })
  email_address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
