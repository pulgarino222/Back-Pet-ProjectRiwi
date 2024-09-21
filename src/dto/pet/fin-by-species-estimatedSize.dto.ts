import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class FindBySpeciesDto {
  @IsNotEmpty()
  @IsString()
  specieId: string; 
}


export class FindBySize{
  @IsNotEmpty()
  @IsEnum(['pequeño', 'mediano', 'grande', 'desconocido'])
  estimatedSize: 'pequeño' | 'mediano' | 'grande' | 'desconocido';
  
}
