import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { PetSpecies } from './petSpecies.entity';
import { PetMedia } from './petMedia.entity';

// Define the Pet entity
@Entity()
export class Pet {
  // Unique identifier for the pet
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Name of the pet
  @Column()
  name: string;

  // Age of the pet
  @Column()
  age: number;

  // Sex of the pet (male or female)
  @Column()
  sex: 'macho' | 'hembra';

  // Size of the pet (current and estimated)
  @Column('json', { nullable: true })
  size?: {
    current: 'pequeño' | 'mediano' | 'grande';
    estimated: 'pequeño' | 'mediano' | 'grande' | 'desconocido';
  };

  // Breed of the pet
  @Column()
  breed: string;

  // Weight of the pet
  @Column()
  weight: number;

  // Time spent at the shelter
  @Column()
  time_at_the_shelter: string;

  // Health history of the pet
  @Column()
  health_history: string;

  // Detailed health information
  @Column('json')
  health: {
    previous_treatments: string;
    dewormed: string;
    medical_necessity: string;
    sterilization: string;
    vaccines: string;
  };

  // Personality traits of the pet (optional)
  @Column({ nullable: true })
  personality?: string;

  // Relationship: Many pets can belong to one user
  @ManyToOne(() => User, (user) => user.pets)
  user: User;

  // Relationship: One pet can have many media files
  @OneToMany(() => PetMedia, (media) => media.pet)
  media: PetMedia[];

  // Relationship: Many pets can belong to one species
  @ManyToOne(() => PetSpecies, (species) => species.pets)
  specie: PetSpecies;
}