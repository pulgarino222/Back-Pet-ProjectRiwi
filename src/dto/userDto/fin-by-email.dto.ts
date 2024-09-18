import { IsEmail } from 'class-validator';

export class GetUserByEmailDto {
  @IsEmail({}, { message: 'the email no is valid' })
  email: string;
}