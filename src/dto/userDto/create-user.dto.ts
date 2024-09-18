import { IsString, IsEmail, IsNotEmpty, IsNumber} from 'class-validator';
import { IsDigits } from 'src/common/decorators/decorators-quantity-numbers';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly entityName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNumber()
  @IsNotEmpty()
  readonly phone: number

  @IsDigits(11,{message:'phone must be a 10 digits of number'})
  @IsNumber()
  @IsNotEmpty()
  readonly whatsapp:number

  @IsString()
  @IsNotEmpty()
  readonly adress:string 

  @IsString()
  @IsNotEmpty()
  readonly password: string;



}
