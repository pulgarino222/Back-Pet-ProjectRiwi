import { Entity, Column, PrimaryGeneratedColumn,OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { User } from './user.entity'; // Asegúrate de que la ruta sea correcta

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => User, (user) => user.roles)
  users: User;
}
