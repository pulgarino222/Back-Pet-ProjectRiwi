import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { PetsController } from 'src/controllers/pets.controller';
import { Pet } from 'src/entities/pet.entity';
import { PetMedia } from 'src/entities/petMedia.entity';
import { PetSpecies } from 'src/entities/petSpecies.entity';
import { PetsService } from 'src/services/pets.service';

// Define the PetsModule using the @Module decorator
@Module({
    imports: [
        // Import TypeOrmModule and configure it to use the Pet, PetMedia, and PetSpecies entities
        TypeOrmModule.forFeature([Pet, PetMedia, PetSpecies])
    ],
    providers: [
        PetsService,    // Provide the PetsService for dependency injection
        CloudinaryService  // Provide the CloudinaryService for dependency injection
    ],
    exports: [
        PetsService,    // Export PetsService to make it available for other modules
        CloudinaryService  // Export CloudinaryService to make it available for other modules
    ],
    controllers: [
        PetsController  // Register the PetsController to handle HTTP requests
    ]
})
// Export the PetsModule class to be used in the main application module
export class PetsModule {}
