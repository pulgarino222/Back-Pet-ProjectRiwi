import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum, IsUUID } from 'class-validator';

export class CreatePetDto {
  @ApiProperty({ description: 'Nombre de la mascota', example: 'Firulais' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'ID de la raza en formato UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  breedId: string;

  @ApiProperty({ description: 'ID de la especie en formato UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  specieId: string;

  @ApiProperty({ description: 'Edad de la mascota', example: 3 })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({ description: 'Sexo de la mascota', enum: ['macho', 'hembra'] })
  @IsNotEmpty()
  @IsEnum(['macho', 'hembra'])
  sex: 'macho' | 'hembra';

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

  @ApiProperty({ description: 'Peso de la mascota', example: 15 })
  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @ApiProperty({ description: 'Tiempo en el refugio', example: '2 meses' })
  @IsNotEmpty()
  time_at_the_shelter: string;

  @ApiProperty({ description: 'Historial de salud', example: 'Sin antecedentes médicos relevantes' })
  @IsNotEmpty()
  health_history: string;

  @ApiProperty({
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
  @IsNotEmpty()
  health: {
    previous_treatments: string;
    dewormed: string;
    medical_necessity: string;
    sterilization: string;
    vaccines: string;
  };

  @ApiPropertyOptional({ description: 'Personalidad de la mascota', example: 'Juguetón' })
  @IsOptional()
  personality?: string;

  @ApiProperty({ description: 'ID del usuario en formato UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  userId: string;
}
