import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class FindBySpeciesEstimatedSizeDto {
  @ApiProperty({ description: 'ID de la especie', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @IsString()
  specieId: string;

  @ApiProperty({ 
    description: 'Tamaño estimado de la mascota', 
    enum: ['pequeño', 'mediano', 'grande', 'desconocido'] 
  })
  @IsNotEmpty()
  @IsEnum(['pequeño', 'mediano', 'grande', 'desconocido'])
  estimatedSize: 'pequeño' | 'mediano' | 'grande' | 'desconocido';
}
