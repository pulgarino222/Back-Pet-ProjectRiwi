import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { User } from './user.entity';

// Define the Role entity
@Entity()
export class Role {
  // Generate a unique UUID for each role
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Define a unique name for each role
  @Column({ unique: true })
  name: string;

  // Establish a many-to-many relationship with User entity
  // One role can be assigned to many users, and one user can have many roles
  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
