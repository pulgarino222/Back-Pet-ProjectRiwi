import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Pet } from './pet.entity';
import { Role } from './role.entity';
import { IsString, IsEmail, IsNumber } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

// Define the User entity
@Entity()
export class User {
  // Primary key, automatically generated UUID
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  // User's entity name (e.g., organization or individual name)
  @Column()
  @IsString()
  entityName: string;

  // User's email address, must be unique
  @Column({ unique: true })
  @IsEmail()
  email: string;

  // User's password
  @Column()
  @IsString()
  password: string;

  // User's city, default value is 'medellin'
  @Column({ default: 'medellin' })
  @IsString()
  city: string;

  // User's address
  @Column()
  @IsString()
  adress: string;

  // User's phone number, stored as a big integer
  @Column({ type: 'bigint' })
  @IsNumber()
  phone: number;

  // User's WhatsApp number, stored as a big integer
  @Column({ type: 'bigint' })
  @IsNumber()
  whatsapp: number;

  // Many-to-Many relationship with Role entity
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable() 
  roles: Role[];

  // One-to-Many relationship with Pet entity
  @OneToMany(() => Pet, (pet) => pet.user)
  pets: Pet[];
}
