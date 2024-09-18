import { IsOptional, IsString, IsNumber, IsEnum, IsUUID } from 'class-validator';

export class UpdatePetDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  breedId?: string;

  @IsOptional()
  specieId?: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsEnum(['macho', 'hembra'])
  sex?: 'macho' | 'hembra';

  @IsOptional()
  size?: {
    current: 'pequeño' | 'mediano' | 'grande';
    estimated: 'pequeño' | 'mediano' | 'grande' | 'desconocido';
  };

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  time_at_the_shelter?: string;

  @IsOptional()
  health_history?: string;

  @IsOptional()
  health?: {
    previous_treatments?: string;
    dewormed?: string;
    medical_necessity?: string;
    sterilization?: string;
    vaccines?: string;
  };

  @IsOptional()
  personality?: string;

  @IsOptional()
  userId?: string;
}
