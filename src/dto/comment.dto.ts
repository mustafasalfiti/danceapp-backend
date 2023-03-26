import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateCommentDto {
    @IsObject()
    @IsNotEmpty()
    readonly user_id: Types.ObjectId;

    @IsObject()
    @IsNotEmpty()
    readonly post_id: Types.ObjectId;

    @IsString()
    @IsNotEmpty()
    readonly content: string;

}


export class UpdateCommentDto {
    @IsString()
    @IsNotEmpty()
    readonly content: string;

}