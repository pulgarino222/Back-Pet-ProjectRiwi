import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import { User } from './user.entity';
import { PetBreed } from './petBreed.entity';
import { PetSpecies } from './petSpecies.entity';
import { PetMedia } from './petMedia.entity';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;



  @Column()
  age: number;

  @Column()
  sex: 'macho' | 'hembra';

  @Column('json', { nullable: true })
  size?: {
    current: 'pequeño' | 'mediano' | 'grande';
    estimated: 'pequeño' | 'mediano' | 'grande' | 'desconocido';
  };

  @Column()
  weight: number;

  @Column()
  time_at_the_shelter: string;

  @Column()
  health_history: string;

  @Column('json')
  health: {
    previous_treatments: string;
    dewormed: string;
    medical_necessity: string;
    sterilization: string;
    vaccines: string;
  };

  @Column({ nullable: true })
  personality?: string;

  @ManyToOne(() => User, (user) => user.pets)
  user: User;

  @OneToMany(() => PetMedia, (media) => media.pet)
  media: PetMedia[];

  @ManyToOne(() => PetSpecies, (species) => species.pets)
  specie: PetSpecies;

  @ManyToOne(() => PetBreed, (breed) => breed.pets)
  breed: PetBreed;
  
}
