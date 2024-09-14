import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  img: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  breed?: string;

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
  specie: 'perro' | 'gato';

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

  @ManyToOne(() => User, (user) => user.pets_id)
  user: User;
}