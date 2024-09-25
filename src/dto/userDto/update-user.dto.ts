import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsNotEmpty, IsUUID, IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { IsDigits } from 'src/common/decorators/decorators-quantity-numbers';

// This class extends CreateUserDto and is used for updating user information
export class UpdateUserDto extends CreateUserDto {
  
  // User's UUID
  @ApiProperty({ description: 'ID del usuario en formato UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  @IsUUID()
  readonly id: string;

  // Name of the entity (organization or company)
  @ApiProperty({ description: 'Nombre de la entidad' })
  @IsString()
  @IsNotEmpty()
  readonly entityName: string;

  // User's email address
  @ApiProperty({ description: 'Correo electrónico del usuario' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  // User's WhatsApp number
  @ApiProperty({ description: 'Número de WhatsApp del usuario', example: 12345678901 })
  @IsNumber()
  @IsDigits(11, { message: 'must be 10 numbers' })
  @IsNotEmpty()
  readonly whatsapp: number;

  // User's phone number
  @ApiProperty({ description: 'Número de teléfono del usuario' })
  @IsNumber()
  @IsNotEmpty()
  readonly phone: number;

  // User's password
  @ApiProperty({ description: 'Contraseña del usuario' })
  @IsString()
  @IsNotEmpty()
  password: string;

  // User's city (optional)
  @ApiPropertyOptional({ description: 'Ciudad del usuario', example: 'Ciudad Ejemplo' })
  @IsOptional()
  @IsString()
  readonly city: string;
}
