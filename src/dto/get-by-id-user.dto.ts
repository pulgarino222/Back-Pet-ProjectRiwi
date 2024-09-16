import { IsString, IsUUID } from 'class-validator';

export class GetUserByIdDto {
  @IsString()
  @IsUUID()
  id: string;
}