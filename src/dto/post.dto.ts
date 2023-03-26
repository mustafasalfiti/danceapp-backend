import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePostDto {
  @IsObject()
  @IsNotEmpty()
  readonly description: Description;

  @IsObject()
  readonly location: ILocation;
}

export class UpdatePostDto {
  @IsObject()
  @IsNotEmpty()
  readonly description: Description;

  @IsObject()
  readonly location: ILocation;
}
