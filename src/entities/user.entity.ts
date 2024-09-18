import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Pet } from './pet.entity';
import { Role } from './role.entity';
import { IsString, IsEmail, IsNumber } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  @IsString()
  entityName: string;

  @Column({ unique: true })
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

  @Column()
  @IsString()
  adress: string;

  @Column()
  @IsNumber()
  phone: number

  @Column()
  @IsNumber()
  whatsapp: number

  @ManyToOne(() => Role, (role) => role.users)
  roles: Role;


  @OneToMany(() => Pet, (pet) => pet.user)
  pets_id: Pet[];
}
