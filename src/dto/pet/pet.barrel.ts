// This file is a barrel file for pet-related DTOs (Data Transfer Objects).
// It re-exports all the individual DTO files from the same directory.

export * from './create-pet.dto';              // Exports all from the file for creating a pet
export * from './fin-by-species-estimatedSize.dto';  // Exports all from the file for finding pets by species and estimated size
export * from './get-by-id-pet.dto';           // Exports all from the file for getting a pet by ID
export * from './update-pet.dto';              // Exports all from the file for updating a pet

// Using this barrel file allows other parts of the application to import
// multiple pet-related DTOs from a single import statement, simplifying imports.
