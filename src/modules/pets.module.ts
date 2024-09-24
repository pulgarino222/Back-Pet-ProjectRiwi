import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { PetsController } from 'src/controllers/pets.controller';
import { Pet } from 'src/entities/pet.entity';
import { PetMedia } from 'src/entities/petMedia.entity';
import { PetSpecies } from 'src/entities/petSpecies.entity';
import { PetsService } from 'src/services/pets.service';

@Module({

    imports: [
        TypeOrmModule.forFeature([Pet, PetMedia, PetSpecies]) // Import the TypeORM module for the specified entities
    ],
    providers: [
        PetsService, // Service for pet-related operations
        CloudinaryService // Service for handling Cloudinary operations
    ],
    exports: [
        PetsService, // Export PetsService for use in other modules
        CloudinaryService // Export CloudinaryService for use in other modules
    ],
    controllers: [
        PetsController // Controller for handling pet-related requests
    ]


})
export class PetsModule {}
