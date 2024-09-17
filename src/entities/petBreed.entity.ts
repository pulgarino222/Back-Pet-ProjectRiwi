import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pet } from './pet.entity';

@Entity()
export class PetBreed {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Pet, (pet) => pet.breed)
  pets: Pet[];
}
