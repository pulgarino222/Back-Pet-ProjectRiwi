import { IsString, IsEmail, IsOptional, IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateUserDto {

    @IsString()
    @IsUUID()
    id: string;

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