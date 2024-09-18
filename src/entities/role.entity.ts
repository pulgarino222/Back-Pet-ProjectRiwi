import { Entity, Column, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import { User } from './user.entity'; // Asegúrate de que la ruta sea correcta

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => User, (user) => user.roles)
  users: User[];
}
