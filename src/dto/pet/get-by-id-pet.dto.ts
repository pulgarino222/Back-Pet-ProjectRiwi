import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

// Data Transfer Object (DTO) for retrieving a pet by its ID
export class GetByIdPetDto {
  // Define the 'id' property with Swagger documentation
  @ApiProperty({ 
    description: 'ID of the pet in UUID format', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  // Ensure the ID is not empty
  @IsNotEmpty()
  // Validate that the ID is in UUID format
  @IsUUID()
  id: string;
}
