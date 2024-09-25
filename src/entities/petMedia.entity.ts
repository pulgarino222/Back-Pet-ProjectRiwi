import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
import { Pet} from './pet.entity';

// Define an entity for storing pet media information
@Entity('pet_media')
export class PetMedia {
  // Unique identifier for each media entry
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Type of media (e.g., image, video)
  @Column()
  media_type: string;

  // URL or path to the media file
  @Column()
  url: string;

  // Timestamp for when the media was created
  @CreateDateColumn()
  createdAt: Date;

  // Establish a many-to-one relationship with the Pet entity
  // One pet can have multiple media entries
  @ManyToOne(() => Pet, (pet) => pet.media)
  pet: Pet;
}