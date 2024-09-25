import { Pet } from "src/entities/pet.entity";
import { CreatePetDto, UpdatePetDto, FindBySpeciesDto, FindBySize, GetByIdPetDto } from "../../../dto/pet/pet.barrel";

// Define the PetInterface with methods for CRUD operations and custom queries
export interface PetInterface {
  // Create a new pet
  newPetInterface(entity: CreatePetDto): Promise<Pet>;

  // Retrieve all pets
  getAllPetsInterface(): Promise<Pet[]>;

  // Get a pet by its ID
  getByIdPetInterface(id: GetByIdPetDto): Promise<Pet>;

  // Update a pet's information
  updatePetInterface(newData: UpdatePetDto, id: GetByIdPetDto): Promise<Pet>;

  // Delete a pet by its ID
  deletePetByIdInterface(id: GetByIdPetDto): Promise<void>;

  // Find pets by species and estimated size
  findBySpeciesAndEstimatedSize(specie: FindBySpeciesDto, size: FindBySize): Promise<Pet[]>;
}



