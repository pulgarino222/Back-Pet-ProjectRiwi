import { IsString, IsEmail, IsOptional, IsNotEmpty, IsUUID, IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { IsDigits } from 'src/common/decorators/decorators-quantity-numbers';
export class UpdateUserDto extends CreateUserDto {

    @IsString()
    @IsUUID()
    id: string;

    
    @IsString()
    @IsNotEmpty()
    entityName: string;

    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsDigits(11,{message:'must be 10 numbers'})
    @IsNotEmpty()
    whatsapp: number;

    @IsNumber()
    @IsNotEmpty()
    phone: number;

    
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsOptional()
    @IsString()
    city: string;
}