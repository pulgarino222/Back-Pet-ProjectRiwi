import { IsEmail,  MaxLength,MinLength } from "class-validator";

export class LoginAuthDto{
    @IsEmail()
    email:string;

    @MinLength(5)
    @MaxLength(16)
    password:string
}