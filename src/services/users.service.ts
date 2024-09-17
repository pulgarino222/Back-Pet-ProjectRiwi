import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from '../dto/userDto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from '../common/interface/userInterface/interfaces.barrel';
import { GetUserByEmailDto, UpdateUserDto, GetUserByIdDto } from '../dto/userDto/user.dto.barrel';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService implements UserInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async newUserInterface(user: CreateUserDto): Promise<User> {
    try {
      const { password } = user;
      const encryptedPassword = await hash(password, 10); // Encrypt the password
      user = { ...user, password: encryptedPassword };
      const newUser = this.userRepository.create(user);
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error('Error creating the user:', error);
      throw new InternalServerErrorException('Unable to create the user');
    }
  }

  async getAllUsersInterface(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new InternalServerErrorException('Unable to fetch users');
    }
  }

  async getByIdUsersInterface(dto: GetUserByIdDto): Promise<User> {
    const { id } = dto;
    try {
      const user = await this.userRepository.findOne({
        where: { id },
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

  async deleteUserByIdInterface(idToDelete: GetUserByIdDto): Promise<User> {
    try {
      const user = await this.getByIdUsersInterface(idToDelete);

      if (user) {
        await this.userRepository.delete(user.id); // Use the user id to delete
        return user;
      }

      throw new NotFoundException('User not found to delete');
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new InternalServerErrorException('Unable to delete the user');
    }
  }

  async updateUsersInterface(newData: UpdateUserDto, idToUpdate: GetUserByIdDto): Promise<User> {
    const { id: idForUpdate } = idToUpdate;

    try {
      const user = await this.getByIdUsersInterface({ id: idForUpdate });

      if (!user) {
        throw new NotFoundException('User not found to update');
      }

      // Encrypt the new password if provided
      if (newData.password) {
        newData.password = await hash(newData.password, 10);
      }

      // Update the user
      await this.userRepository.update(idForUpdate, newData);

      // Return the updated user
      return this.userRepository.findOne({ where: { id: idForUpdate } });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException('Unable to update the user');
    }
  }

  async findByEmail(dto: GetUserByEmailDto): Promise<User> {
    const { email } = dto;
    try {
      const user = await this.userRepository.findOne({
        where: { email },
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

