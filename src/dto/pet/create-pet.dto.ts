import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum, IsUUID, IsObject } from 'class-validator';

export class CreatePetDto {

  @ApiProperty({ description: 'Nombre de la mascota', example: 'Firulais' })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ description: 'Edad de la mascota', example: 3 })
  @IsNotEmpty()
  @IsNumber()
  readonly age: number;

  @ApiProperty({ description: 'Sexo de la mascota', enum: ['macho', 'hembra'] })
  @IsNotEmpty()
  @IsEnum(['macho', 'hembra'])
  readonly sex: 'macho' | 'hembra';

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

  @ApiProperty({ description: 'Raza de la mascota', example: 'Labrador' })
  @IsString()
  @IsNotEmpty()
  readonly breed: string; 
  
  @ApiProperty({ description: 'Peso de la mascota', example: 15 })
  @IsNotEmpty()
  @IsNumber()
  readonly weight: number;

  @ApiProperty({ description: 'Tiempo en el refugio', example: '2 meses' })
  @IsNotEmpty()
  @IsString()
  readonly time_at_the_shelter: string;

  @ApiProperty({ description: 'Historial de salud', example: 'Sin antecedentes médicos relevantes' })
  @IsNotEmpty()
  @IsString()
  readonly health_history: string;

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

  @ApiPropertyOptional({ description: 'Personalidad de la mascota', example: 'Juguetón' })
  @IsString()
  @IsOptional()
  readonly personality?: string;

  @ApiProperty({ description: 'ID del usuario en formato UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({ description: 'ID de la especie en formato UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  readonly specieId: string;

  @ApiPropertyOptional({ description: 'Imagen de la mascota' })
  @IsOptional()
  image?: Express.Multer.File;
}
