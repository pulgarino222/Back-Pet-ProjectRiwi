import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pet } from './pet.entity';

// Define an entity for pet species
@Entity()
export class PetSpecies {
  // Generate a unique UUID for each pet species
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Store the name of the pet species
  @Column()
  name: string;

  // Establish a one-to-many relationship with the Pet entity
  // One pet species can have many pets
  @OneToMany(() => Pet, (pet) => pet.specie)
  pets: Pet[];
}
