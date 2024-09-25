import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

// Data Transfer Object (DTO) for finding pets by species
export class FindBySpeciesDto {
  @IsNotEmpty() // Ensures the field is not empty
  @IsString() // Validates that the field is a string
  specieId: string; // Property to store the species ID
}

// Data Transfer Object (DTO) for finding pets by estimated size
export class FindBySize {
  @IsNotEmpty() // Ensures the field is not empty
  @IsEnum(['pequeño', 'mediano', 'grande', 'desconocido']) // Validates that the field is one of the specified enum values
  estimatedSize: 'pequeño' | 'mediano' | 'grande' | 'desconocido'; // Property to store the estimated size
  // 'pequeño' means small, 'mediano' means medium, 'grande' means large, 'desconocido' means unknown
}
