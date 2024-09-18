import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum, IsUUID } from 'class-validator';

export class CreatePetDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  breedId: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  specieId: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsEnum(['macho', 'hembra'])
  sex: 'macho' | 'hembra';

  @IsOptional()
  size: {
    current: 'pequeño' | 'mediano' | 'grande';
    estimated: 'pequeño' | 'mediano' | 'grande' | 'desconocido';
  };

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  time_at_the_shelter: string;

  @IsNotEmpty()
  health_history: string;

  @IsNotEmpty()
  health: {
    previous_treatments: string;
    dewormed: string;
    medical_necessity: string;
    sterilization: string;
    vaccines: string;
  };

  @IsOptional()
  personality?: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  userId: string;
}
