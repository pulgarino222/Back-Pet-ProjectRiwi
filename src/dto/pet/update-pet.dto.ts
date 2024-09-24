import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsEnum, IsUUID } from 'class-validator';

export class UpdatePetDto {
  @ApiPropertyOptional({ description: 'ID de la mascota en formato UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiPropertyOptional({ description: 'Nombre de la mascota', example: 'Firulais' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'ID de la raza en formato UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  breedId?: string;

  @ApiPropertyOptional({ description: 'ID de la especie en formato UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  specieId?: string;

  @ApiPropertyOptional({ description: 'Edad de la mascota', example: 3 })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiPropertyOptional({ description: 'Sexo de la mascota', enum: ['macho', 'hembra'] })
  @IsOptional()
  @IsEnum(['macho', 'hembra'])
  sex?: 'macho' | 'hembra';

  @ApiPropertyOptional({
    description: 'Tamaño de la mascota',
    type: Object,
    properties: {
      current: { type: 'string', enum: ['pequeño', 'mediano', 'grande'] },
      estimated: { type: 'string', enum: ['pequeño', 'mediano', 'grande', 'desconocido'] },
    },
  })
  @IsOptional()
  size?: {
    current: 'pequeño' | 'mediano' | 'grande';
    estimated: 'pequeño' | 'mediano' | 'grande' | 'desconocido';
  };

  @ApiPropertyOptional({ description: 'Peso de la mascota', example: 15 })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiPropertyOptional({ description: 'Tiempo en el refugio', example: '2 meses' })
  @IsOptional()
  time_at_the_shelter?: string;

  @ApiPropertyOptional({ description: 'Historial de salud', example: 'Sin antecedentes médicos relevantes' })
  @IsOptional()
  health_history?: string;

  @ApiPropertyOptional({
    description: 'Información sobre la salud',
    type: Object,
    properties: {
      previous_treatments: { type: 'string' },
      dewormed: { type: 'string' },
      medical_necessity: { type: 'string' },
      sterilization: { type: 'string' },
      vaccines: { type: 'string' },
    },
  })
  @IsOptional()
  health?: {
    previous_treatments?: string;
    dewormed?: string;
    medical_necessity?: string;
    sterilization?: string;
    vaccines?: string;
  };

  @ApiPropertyOptional({ description: 'Personalidad de la mascota', example: 'Juguetón' })
  @IsOptional()
  personality?: string;

  @ApiPropertyOptional({ description: 'ID del usuario en formato UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  userId?: string;
}
