import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsNumber, IsUUID, IsArray } from 'class-validator';
import { IsDigits } from 'src/common/decorators/decorators-quantity-numbers';

export class CreateUserDto {
  @ApiProperty({ description: 'Nombre de la entidad' })
  @IsString()
  @IsNotEmpty()
  readonly entityName: string;

  @ApiProperty({ description: 'Correo electrónico del usuario' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: 'Número de teléfono del usuario' })
  @IsNumber()
  @IsNotEmpty()
  readonly phone: number;

  @ApiProperty({ description: 'Número de WhatsApp del usuario', example: 12345678901 })
  @IsDigits(11, { message: 'whatsapp must be a 10 digits number' })
  @IsNumber()
  @IsNotEmpty()
  readonly whatsapp: number;

  @ApiProperty({ description: 'Dirección del usuario' })
  @IsString()
  @IsNotEmpty()
  readonly adress: string;

  @ApiProperty({ description: 'Contraseña del usuario' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ type: [String], description: 'Roles del usuario', example: ['role1-uuid', 'role2-uuid'] })
  @IsUUID('all', { each: true }) 
  @IsArray() 
  readonly roles: string[]; 
}
