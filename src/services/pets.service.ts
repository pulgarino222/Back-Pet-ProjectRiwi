import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from 'src/entities/pet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PetsService {
    constructor (@InjectRepository (Pet) private petRepository:Repository<Pet>
){}

async newPet(dataPet){ 
   const newPet= await this.petRepository.create(dataPet)
   return this.petRepository.save(newPet)

}

}



