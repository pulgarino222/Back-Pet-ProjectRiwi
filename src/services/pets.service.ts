import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreatePetDto, UpdatePetDto, FindBySpeciesDto, FindBySize, GetByIdPetDto } from 'src/dto/pet/pet.barrel';
import { Pet } from 'src/entities/pet.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PetInterface } from 'src/common/interface/pet/petInterface';
import { PetMedia } from 'src/entities/petMedia.entity';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { PetSpecies } from 'src/entities/petSpecies.entity';

@Injectable()
export class PetsService implements PetInterface {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
    @InjectRepository(PetMedia)
    private readonly petMediaRepository: Repository<PetMedia>,
    @InjectRepository(PetSpecies)
    private readonly petSpeciesRepository: Repository<PetSpecies>,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  // Method to create a new pet
  async newPetInterface(entity: CreatePetDto): Promise<Pet> {
    if (!entity.image) {
      throw new Error('Image file is required');
    }

    // Create and save the pet in the database
    const newPet = this.petRepository.create({ ...entity });
    const savedPet = await this.petRepository.save(newPet);

    // Upload the image to Cloudinary
    const uploadedImage = await this.cloudinaryService.uploadFile(entity.image);
    const imageUrl = uploadedImage.secure_url;
    const mediaType = uploadedImage.resource_type;

    // Create the entry in PetMedia associated with the pet
    const petMedia = this.petMediaRepository.create({
      media_type: mediaType,
      url: imageUrl,
      pet: savedPet,  // Associate the Pet entity with the image
    });

    await this.petMediaRepository.save(petMedia);

    return this.getByIdPetInterface({ id: savedPet.id }); // Return the pet with relationships
  }

  // Method to get all pets
  async getAllPetsInterface(): Promise<Pet[]> {
    try {
      return await this.petRepository.find({
        relations: ['specie', 'media', 'user'], // Load relationships
      });
    } catch (error) {
      console.error('Error retrieving all pets:', error);
      throw new InternalServerErrorException('Unable to retrieve all pets');
    }
  }

  // Method to get a pet by ID
  async getByIdPetInterface(dto: GetByIdPetDto): Promise<Pet> {
    const { id } = dto;
    try {
      const pet = await this.petRepository.findOne({
        where: { id },
        relations: ['specie', 'media', 'user'], // Load relationships
      });
      if (!pet) {
        throw new NotFoundException(`Pet with ID ${id} not found`);
      }
      return pet;
    } catch (error) {
      console.error('Error retrieving pet:', error);
      throw new InternalServerErrorException('Unable to retrieve the pet');
    }
  }

  // Method to update a pet by ID
  async updatePetInterface(newData: UpdatePetDto, id: GetByIdPetDto): Promise<Pet> {
    const { id: idForUpdate } = id;
    
    // Add console messages to verify the flow
    console.log('ID for update:', idForUpdate);
    console.log('New data to update:', newData);
  
    try {
      const pet = await this.petRepository.preload({ id: idForUpdate, ...newData });
  
      if (!pet) {
        console.log(`Pet with ID ${idForUpdate} not found`);
        throw new NotFoundException(`Pet with ID ${idForUpdate} not found`);
      }
  
      console.log('Pet found, updating...', pet);
      await this.petRepository.save(pet);
  
      // Return the updated pet with relationships
      return await this.getByIdPetInterface({ id: idForUpdate });
    } catch (error) {
      console.error('Error updating pet:', error);
      throw new InternalServerErrorException('Unable to update the pet');
    }
  }

  // Method to delete a pet by ID
  async deletePetByIdInterface(id: GetByIdPetDto): Promise<void> {
    const { id: petId } = id;
    try {
      await this.petMediaRepository.delete({ pet: { id: petId } });

      const result = await this.petRepository.delete(petId);
      if (result.affected === 0) {
        throw new NotFoundException(`Pet with ID ${petId} not found`);
      }
    } catch (error) {
      console.error('Error deleting pet:', error);
      throw new InternalServerErrorException('Unable to delete the pet');
    }
  }

  // Method to find pets by species and estimated size
  async findBySpeciesAndEstimatedSize(specie: FindBySpeciesDto, size: FindBySize): Promise<Pet[]> {
    const { specieId } = specie;
    const { estimatedSize } = size;
    try {
      const pets = await this.petRepository.createQueryBuilder('pet')
        .leftJoinAndSelect('pet.specie', 'species')
        .where('pet.specieId = :specieId', { specieId })
        .andWhere('pet.size->>\'estimated\' = :estimatedSize', { estimatedSize })
        .getMany();

      if (pets.length === 0) {
        throw new NotFoundException(`No pets found for species ID ${specieId} and size ${estimatedSize}`);
      }

      return pets;
    } catch (error) {
      console.error('Error finding pets by species and estimated size:', error);
      throw new InternalServerErrorException('Unable to find pets by species and size');
    }
  }
}
