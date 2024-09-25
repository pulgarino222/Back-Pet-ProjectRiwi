import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum, IsUUID, IsObject } from 'class-validator';

// Data Transfer Object for creating a new pet
export class CreatePetDto {

  // Optional pet name
  @ApiProperty({ description: 'Nombre de la mascota', example: 'Firulais' })
  @IsString()
  @IsOptional()
  readonly name?: string;

  // Required pet age
  @ApiProperty({ description: 'Edad de la mascota', example: 3 })
  @IsNotEmpty()
  @IsNumber()
  readonly age: number;

  // Required pet sex, either 'macho' (male) or 'hembra' (female)
  @ApiProperty({ description: 'Sexo de la mascota', enum: ['macho', 'hembra'] })
  @IsNotEmpty()
  @IsEnum(['macho', 'hembra'])
  readonly sex: 'macho' | 'hembra';

  // Required pet size, including current and estimated size
  @ApiProperty({
    description: 'Tamaño de la mascota',
    type: Object,
    properties: {
      current: { type: 'string', enum: ['pequeño', 'mediano', 'grande'] },
      estimated: { type: 'string', enum: ['pequeño', 'mediano', 'grande', 'desconocido'] },
    },
  })
  @IsNotEmpty()
  @IsObject()
  readonly size: {
    current: 'pequeño' | 'mediano' | 'grande';
    estimated: 'pequeño' | 'mediano' | 'grande' | 'desconocido';
  };

  // Required pet breed
  @ApiProperty({ description: 'Raza de la mascota', example: 'Labrador' })
  @IsString()
  @IsNotEmpty()
  readonly breed: string; 
  
  // Required pet weight
  @ApiProperty({ description: 'Peso de la mascota', example: 15 })
  @IsNotEmpty()
  @IsNumber()
  readonly weight: number;

  // Required time spent at the shelter
  @ApiProperty({ description: 'Tiempo en el refugio', example: '2 meses' })
  @IsNotEmpty()
  @IsString()
  readonly time_at_the_shelter: string;

  // Required health history
  @ApiProperty({ description: 'Historial de salud', example: 'Sin antecedentes médicos relevantes' })
  @IsNotEmpty()
  @IsString()
  readonly health_history: string;

  // Required detailed health information
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
  @IsObject()
  readonly health: {
    previous_treatments: string;
    dewormed: string;
    medical_necessity: string;
    sterilization: string;
    vaccines: string;
  };

  // Optional pet personality
  @ApiPropertyOptional({ description: 'Personalidad de la mascota', example: 'Juguetón' })
  @IsString()
  @IsOptional()
  readonly personality?: string;

  // Required user ID in UUID format
  @ApiProperty({ description: 'ID del usuario en formato UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  readonly userId: string;

  // Required species ID in UUID format
  @ApiProperty({ description: 'ID de la especie en formato UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  readonly specieId: string;

  // Optional pet image
  @ApiPropertyOptional({ description: 'Imagen de la mascota' })
  @IsOptional()
  image?: Express.Multer.File;
}
