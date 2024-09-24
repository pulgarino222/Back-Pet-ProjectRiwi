import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class GetUserByEmailDto {
  @ApiProperty({ description: 'Correo electrónico del usuario', example: 'usuario@ejemplo.com' })
  @IsEmail({}, { message: 'The email is not valid' })
  email: string;
}
