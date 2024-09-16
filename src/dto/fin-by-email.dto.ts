import { IsEmail } from 'class-validator';

export class GetUserByEmailDto {
  @IsEmail({}, { message: 'El email debe ser una dirección de correo válida' })
  email: string;
}