import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class FindBySpeciesEstimatedSizeDto {
  @IsNotEmpty()
  @IsString()
  specieId: string;

  @IsNotEmpty()
  @IsEnum(['pequeño', 'mediano', 'grande', 'desconocido'])
  estimatedSize: 'pequeño' | 'mediano' | 'grande' | 'desconocido';
}
