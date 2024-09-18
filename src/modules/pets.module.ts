import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsController } from 'src/controllers/pets.controller';
import { Pet } from 'src/entities/pet.entity';
import { PetsService } from 'src/services/pets.service';

@Module({
    imports: [TypeOrmModule.forFeature([Pet])],
    providers:[PetsService],
    exports:[PetsService],
    controllers:[PetsController]
})
export class PetsModule {}
