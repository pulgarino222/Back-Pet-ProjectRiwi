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

  // Method to create a new user
  async newUserInterface(user: CreateUserDto): Promise<User> {
    try {
      const { password, roles } = user;
      const encryptedPassword = await hash(password, 10);
  
      const roleEntities = await Promise.all(
        roles.map(async (roleId) => {
          const role = await this.roleRepository.findOne({ where: { id: roleId } });
          if (!role) {
            throw new NotFoundException(`Role with ID ${roleId} not found`);
          }
          return role;
        })
      );
  
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

  // Method to get all users
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

  // Method to get a user by ID
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
  
  // Method to delete a user by ID
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

  // Method to update a user
  async updateUsersInterface(newData: UpdateUserDto, idToUpdate: GetUserByIdDto): Promise<User> {
    const { id: idForUpdate } = idToUpdate;
  
    try {
      const user = await this.getByIdUsersInterface({ id: idForUpdate });
  
      if (!user) {
        throw new NotFoundException('User not found to update');
      }
  
      if (newData.password) {
        newData.password = await hash(newData.password, 10);
      }
  
      const { roles, ...restOfNewData } = newData;
      Object.assign(user, restOfNewData);
  
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
  
      return await this.userRepository.findOne({
        where: { id: idForUpdate },
        relations: ['roles', 'pets'], 
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException('Unable to update the user');
    }
  }

  // Method to find a user by email
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
