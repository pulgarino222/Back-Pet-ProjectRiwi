import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

// This DTO (Data Transfer Object) is used for retrieving a user by their ID
export class GetUserByIdDto {
  // The @ApiProperty decorator is used to provide metadata for Swagger documentation
  // It describes the 'id' property and provides an example UUID
  @ApiProperty({ description: 'User ID in UUID format', example: '123e4567-e89b-12d3-a456-426614174000' })
  
  // @IsString() validator ensures that the 'id' is a string
  @IsString()
  
  // @IsUUID() validator checks if the 'id' is a valid UUID format
  @IsUUID()
  
  // The 'id' property of type string, which will store the user's UUID
  id: string;
}
