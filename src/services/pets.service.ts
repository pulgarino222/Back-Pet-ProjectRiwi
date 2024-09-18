import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreatePetDto, UpdatePetDto, FindBySpeciesEstimatedSizeDto, GetByIdPetDto } from 'src/dto/pet/pet.dto.barrel';
import { Pet } from 'src/entities/pet.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PetInterface } from 'src/common/interface/pet/petInterface';

@Injectable()
export class PetsService implements PetInterface {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) { }

  async newPetInterface(entity: CreatePetDto): Promise<Pet> {
    try {
      const newPet = this.petRepository.create(entity);
      return await this.petRepository.save(newPet);
    } catch (error) {
      console.error('Error creating pet:', error);
      throw new InternalServerErrorException('Unable to create the pet');
    }
  }

  async getAllPetsInterface(): Promise<Pet[]> {
    try {
      return await this.petRepository.find();
    } catch (error) {
      console.error('Error retrieving pets:', error);
      throw new InternalServerErrorException('Unable to retrieve pets');
    }
  }

  async getByIdPetInterface(dto: GetByIdPetDto): Promise<Pet> {
    const { id } = dto;
    try {
      const pet = await this.petRepository.findOneBy({ id });
      if (!pet) {
        throw new NotFoundException(`Pet with ID ${id} not found`);
      }
      return pet;
    } catch (error) {
      console.error('Error retrieving pet:', error);
      throw new InternalServerErrorException('Unable to retrieve the pet');
    }
  }

  async updatePetInterface(newData: UpdatePetDto, id: GetByIdPetDto): Promise<Pet> {
    const { id: idForUpdate } = id;
    try {
      const pet = await this.petRepository.preload({ id: idForUpdate, ...newData });
      if (!pet) {
        throw new NotFoundException(`Pet with ID ${idForUpdate} not found`);
      }
      return await this.petRepository.save(pet);
    } catch (error) {
      console.error('Error updating pet:', error);
      throw new InternalServerErrorException('Unable to update the pet');
    }
  }

  async deletePetByIdInterface(id: GetByIdPetDto): Promise<void> {
    try {
      const result = await this.petRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Pet with ID ${id} not found`);
      }
    } catch (error) {
      console.error('Error deleting pet:', error);
      throw new InternalServerErrorException('Unable to delete the pet');
    }
  }

  async findBySpeciesAndEstimatedSize(dto: FindBySpeciesEstimatedSizeDto): Promise<Pet[]> {
    const { specieId, estimatedSize } = dto;
    try {
      return await this.petRepository.createQueryBuilder('pet')
        .where('pet.specieId = :specieId', { specieId })
        .andWhere('pet.size->>\'estimated\' = :estimatedSize', { estimatedSize })
        .getMany();
    } catch (error) {
      console.error('Error finding pets by species and estimated size:', error);
      throw new InternalServerErrorException('Unable to find pets');
    }
  }
}
