import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetByIdPetDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
