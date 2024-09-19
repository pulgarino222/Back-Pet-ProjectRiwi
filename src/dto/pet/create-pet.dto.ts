import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum, IsUUID } from 'class-validator';

export class CreatePetDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  readonly breedId: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  readonly specieId: string;

  @IsNotEmpty()
  @IsNumber()
  readonly age: number;

  @IsNotEmpty()
  @IsEnum(['macho', 'hembra'])
  readonly sex: 'macho' | 'hembra';

  @IsOptional()
  readonly size?: {
    current: 'pequeño' | 'mediano' | 'grande';
    estimated: 'pequeño' | 'mediano' | 'grande' | 'desconocido';
  };

  @IsNotEmpty()
  @IsNumber()
  readonly weight: number;

  @IsNotEmpty()
  readonly time_at_the_shelter: string;

  @IsNotEmpty()
  readonly health_history: string;

  @IsNotEmpty()
  health: {
    previous_treatments: string;
    dewormed: string;
    medical_necessity: string;
    sterilization: string;
    vaccines: string;
  };

  @IsOptional()
  readonly personality?: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  readonly userId: string;
}
