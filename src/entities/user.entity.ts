import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pet } from './pet.entity';
import { IsString, IsEmail } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  @IsString()
  entityName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column({
    default: 'medellin'
  })
  @IsString()
  city: string;
  
  @OneToMany(() => Pet, (pet) => pet.user)
  pets_id: Pet[];
}