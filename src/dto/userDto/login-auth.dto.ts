import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

// Data Transfer Object (DTO) for user login authentication
export class LoginAuthDto {
  // Email property
  @ApiProperty({ description: 'User\'s email address', example: 'usuario@ejemplo.com' })
  @IsEmail() // Validates that the input is a valid email format
  email: string;

  // Password property
  @ApiProperty({ description: 'User\'s password (between 5 and 16 characters)', example: 'contraseña123' })
  @MinLength(5) // Ensures the password is at least 5 characters long
  @MaxLength(16) // Ensures the password is no more than 16 characters long
  password: string;
}
