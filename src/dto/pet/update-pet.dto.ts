import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsEnum, IsUUID } from 'class-validator';

// Data Transfer Object for updating a pet's information
export class UpdatePetDto {
  // Pet's UUID
  @ApiPropertyOptional({ description: 'Pet ID in UUID format', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  @IsUUID()
  id?: string;

  // Pet's name
  @ApiPropertyOptional({ description: 'Pet name', example: 'Firulais' })
  @IsOptional()
  @IsString()
  name?: string;

  // Breed ID in UUID format
  @ApiPropertyOptional({ description: 'Breed ID in UUID format', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  breedId?: string;

  // Species ID in UUID format
  @ApiPropertyOptional({ description: 'Species ID in UUID format', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  specieId?: string;

  // Pet's age
  @ApiPropertyOptional({ description: 'Pet age', example: 3 })
  @IsOptional()
  @IsNumber()
  age?: number;

  // Pet's sex (male or female)
  @ApiPropertyOptional({ description: 'Pet sex', enum: ['macho', 'hembra'] })
  @IsOptional()
  @IsEnum(['macho', 'hembra'])
  sex?: 'macho' | 'hembra';

  // Pet's size (current and estimated)
  @ApiPropertyOptional({
    description: 'Pet size',
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

  // Pet's weight
  @ApiPropertyOptional({ description: 'Pet weight', example: 15 })
  @IsOptional()
  @IsNumber()
  weight?: number;

  // Time spent in the shelter
  @ApiPropertyOptional({ description: 'Time at the shelter', example: '2 meses' })
  @IsOptional()
  time_at_the_shelter?: string;

  // Pet's health history
  @ApiPropertyOptional({ description: 'Health history', example: 'Sin antecedentes médicos relevantes' })
  @IsOptional()
  health_history?: string;

  // Detailed health information
  @ApiPropertyOptional({
    description: 'Health information',
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

  // Pet's personality
  @ApiPropertyOptional({ description: 'Pet personality', example: 'Juguetón' })
  @IsOptional()
  personality?: string;

  // User ID associated with the pet (in UUID format)
  @ApiPropertyOptional({ description: 'User ID in UUID format', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  userId?: string;
}
