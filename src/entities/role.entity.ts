import { Entity, Column, PrimaryGeneratedColumn,OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
