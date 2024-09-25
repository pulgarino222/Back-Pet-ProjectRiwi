import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsNumber, IsUUID, IsArray } from 'class-validator';
import { IsDigits } from 'src/common/decorators/decorators-quantity-numbers';

// Data Transfer Object (DTO) for creating a new user
export class CreateUserDto {
  // Entity name (e.g., company or organization name)
  @ApiProperty({ description: 'Nombre de la entidad' })
  @IsString()
  @IsNotEmpty()
  readonly entityName: string;

  // User's email address
  @ApiProperty({ description: 'Correo electrónico del usuario' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  // User's phone number
  @ApiProperty({ description: 'Número de teléfono del usuario' })
  @IsNumber()
  @IsNotEmpty()
  readonly phone: number;

  // User's WhatsApp number (must be 11 digits)
  @ApiProperty({ description: 'Número de WhatsApp del usuario', example: 12345678901 })
  @IsDigits(11, { message: 'whatsapp must be a 10 digits number' })
  @IsNumber()
  @IsNotEmpty()
  readonly whatsapp: number;

  // User's address
  @ApiProperty({ description: 'Dirección del usuario' })
  @IsString()
  @IsNotEmpty()
  readonly adress: string;

  // User's password
  @ApiProperty({ description: 'Contraseña del usuario' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  // Array of role UUIDs assigned to the user
  @ApiProperty({ type: [String], description: 'Roles del usuario', example: ['role1-uuid', 'role2-uuid'] })
  @IsUUID('all', { each: true }) 
  @IsArray() 
  readonly roles: string[]; 
}
