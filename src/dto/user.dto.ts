import { IsDate, isDateString, IsEmail, IsNotEmpty, IsObject, IsString } from "class-validator";
import { Date } from "mongoose";

export class CreateUserDto {
    // @IsObject()
    // readonly fullname: Fullname
    @IsString()
    @IsNotEmpty()
    readonly phone_number: string;

    @IsString()
    @IsNotEmpty()
    readonly password:string

    // @IsString()
    // readonly birthday: Date

    @IsEmail()
    readonly email_address: string

}


export class UpdateUserDto {
    @IsObject()
    readonly fullname: Fullname

    @IsString()
    @IsNotEmpty()
    readonly phone_number: string;

    @IsEmail()
    readonly email_address: string

}