import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from '../dto/userDto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from '../common/interface/userInterface/interfaces.barrel';
import { GetUserByEmailDto, UpdateUserDto, GetUserByIdDto } from '../dto/userDto/user.barrel';
import { hash } from 'bcrypt';
import { Role } from 'src/entities/role.entity';

@Injectable()
export class UsersService implements UserInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  // Creates a new user
  async newUserInterface(user: CreateUserDto): Promise<User> {
    try {
      const { password, roles } = user;
      // Encrypt the password
      const encryptedPassword = await hash(password, 10);

      // Find and validate all roles
      const roleEntities = await Promise.all(
        roles.map(async (roleId) => {
          const role = await this.roleRepository.findOne({ where: { id: roleId } });
          if (!role) {
            throw new NotFoundException(`Role with ID ${roleId} not found`);
          }
          return role;
        })
      );

      // Create and save the new user
      const newUser = this.userRepository.create({
        ...user,
        password: encryptedPassword,
        roles: roleEntities, 
      });

      return await this.userRepository.save(newUser); 
    } catch (error) {
      console.error('Error creating the user:', error);
      throw new InternalServerErrorException('Unable to create the user');
    }
  }

  // Retrieves all users with their roles and pets
  async getAllUsersInterface(): Promise<User[]> {
    try {
      const users = await this.userRepository.find({ 
        relations: ['roles', 'pets'], 
      });
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new InternalServerErrorException('Unable to fetch users');
    }
  }

  // Retrieves a user by ID with their roles and pets
  async getByIdUsersInterface(dto: GetUserByIdDto): Promise<User> {
    const { id } = dto;
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['roles', 'pets'], 
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new InternalServerErrorException('Unable to fetch the user');
    }
  }
  
  // Deletes a user by ID
  async deleteUserByIdInterface(idToDelete: GetUserByIdDto): Promise<User> {
    try {
      const user = await this.getByIdUsersInterface(idToDelete);

      if (user) {
        await this.userRepository.delete(user.id);
        return user;
      }

      throw new NotFoundException('User not found to delete');
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new InternalServerErrorException('Unable to delete the user');
    }
  }

  // Updates a user's information
  async updateUsersInterface(newData: UpdateUserDto, idToUpdate: GetUserByIdDto): Promise<User> {
    const { id: idForUpdate } = idToUpdate;
  
    try {
      const user = await this.getByIdUsersInterface({ id: idForUpdate });
  
      if (!user) {
        throw new NotFoundException('User not found to update');
      }
  
      // If a new password is provided, hash it
      if (newData.password) {
        newData.password = await hash(newData.password, 10);
      }
  
      const { roles, ...restOfNewData } = newData;
      Object.assign(user, restOfNewData);
  
      // Update roles if provided
      if (roles) {
        const roleEntities = await Promise.all(
          roles.map(async (roleId) => {
            const role = await this.roleRepository.findOne({ where: { id: roleId } });
            if (!role) {
              throw new NotFoundException(`Role with ID ${roleId} not found`);
            }
            return role;
          })
        );
        user.roles = roleEntities;
      }
  
      await this.userRepository.save(user);
  
      // Fetch and return the updated user with relations
      return await this.userRepository.findOne({
        where: { id: idForUpdate },
        relations: ['roles', 'pets'], 
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException('Unable to update the user');
    }
  }

  // Finds a user by email with their roles and pets
  async findByEmail(dto: GetUserByEmailDto): Promise<User> {
    const { email } = dto;
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        relations: ['roles', 'pets'], 
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      console.error('Error searching user by email:', error);
      throw new InternalServerErrorException('Unable to find the user by email');
    }
  }
}
