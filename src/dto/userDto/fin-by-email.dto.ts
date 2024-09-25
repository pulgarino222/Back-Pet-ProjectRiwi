import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

// Data Transfer Object (DTO) for retrieving a user by email
export class GetUserByEmailDto {
  // Decorator to define API documentation for the email property
  @ApiProperty({ 
    description: 'User\'s email address', 
    example: 'usuario@ejemplo.com' 
  })
  // Decorator to validate that the input is a valid email format
  @IsEmail({}, { message: 'The email is not valid' })
  email: string;
}
