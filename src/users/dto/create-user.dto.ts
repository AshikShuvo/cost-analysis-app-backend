import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    phoneNumber:string;
    salt:string
    @IsNotEmpty()
    password: string;
}
