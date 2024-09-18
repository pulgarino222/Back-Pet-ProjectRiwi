import { Pet } from "src/entities/pet.entity";
import { CreatePetDto, UpdatePetDto, FindBySpeciesEstimatedSizeDto, GetByIdPetDto } from "../../../dto/pet/pet.dto.barrel";

export interface PetInterface {
  newPetInterface(entity: CreatePetDto): Promise<Pet>;

  getAllPetsInterface(): Promise<Pet[]>;

  getByIdPetInterface(id: GetByIdPetDto): Promise<Pet>;

  updatePetInterface(newData: UpdatePetDto, id: GetByIdPetDto): Promise<Pet>;

  deletePetByIdInterface(id: GetByIdPetDto): Promise<void>;

  findBySpeciesAndEstimatedSize(dto: FindBySpeciesEstimatedSizeDto): Promise<Pet[]>;
}
