import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    readonly user_id: Types.ObjectId;

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