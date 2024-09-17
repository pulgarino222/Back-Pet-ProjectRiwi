import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  import { Pet} from './pet.entity';
  
  @Entity('pet_media')
  export class PetMedia {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    media_type: string;
  
    @Column()
    url: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @ManyToOne(() => Pet, (pet) => pet.media)
    pet: Pet;
  }