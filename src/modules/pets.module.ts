import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { PetsController } from 'src/controllers/pets.controller';
import { Pet } from 'src/entities/pet.entity';
import { PetMedia } from 'src/entities/petMedia.entity';
import { PetsService } from 'src/services/pets.service';

@Module({
    imports: [TypeOrmModule.forFeature([Pet,PetMedia])],
    providers:[PetsService,CloudinaryService],
    exports:[PetsService,CloudinaryService],
    controllers:[PetsController]
})
export class PetsModule {}
