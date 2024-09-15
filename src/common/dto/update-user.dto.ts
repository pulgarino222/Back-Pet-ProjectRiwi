import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {

    @IsNotEmpty()
    @IsString()
    entityName?: string;

    @IsNotEmpty()
    @IsEmail()

    email?: string;
    @IsNotEmpty()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    city?: string;
}