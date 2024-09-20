import { IsString, IsEmail, IsOptional, IsNotEmpty, IsUUID, IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { IsDigits } from 'src/common/decorators/decorators-quantity-numbers';
export class UpdateUserDto extends CreateUserDto {

    @IsString()
    @IsUUID()
    readonly id: string;

    
    @IsString()
    @IsNotEmpty()
    readonly entityName: string;

    
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNumber()
    @IsDigits(11,{message:'must be 10 numbers'})
    @IsNotEmpty()
    readonly whatsapp: number;

    @IsNumber()
    @IsNotEmpty()
    readonly phone: number;

    
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsOptional()
    @IsString()
    readonly city: string;
}