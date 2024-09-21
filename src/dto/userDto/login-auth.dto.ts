import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({ description: 'Correo electrónico del usuario', example: 'usuario@ejemplo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario (entre 5 y 16 caracteres)', example: 'contraseña123' })
  @MinLength(5)
  @MaxLength(16)
  password: string;
}
