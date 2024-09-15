import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from 'src/common/interface/user.interface';
import { GetUserByIdDto } from 'src/common/dto/get-by-id-user.dto';
import { UpdateUserDto } from 'src/common/dto/update-user.dto';
import { GetUserByEmailDto } from 'src/common/dto/fin-by-email.dto';

@Injectable()
export class UsersService implements UserInterface {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async newUserInterface(user: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(user);
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw new Error('No se pudo crear el usuario');
    }
  }

  async getAllUsersInterface(): Promise<User[]> {
    try {
      const users = this.userRepository.find()
      return users
    } catch (error) {
      console.error(`error al obtener usuario, ${error}`)
      throw new Error('no se pudo obtener usuarios')

    }
  }

  async getByIdUsersInterface(dto: GetUserByIdDto): Promise<User> {
    const { id } = dto
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: id
        },
      });

      if (!user) {
        throw new Error('Usuario no encontrado')
      }

      return user
    } catch (error) {
      console.error('Error al obtener usuario:', error)
      throw new Error('No se pudo obtener el usuario')
    }
  }

  async deleteUserByIdInterface(idToDelete: GetUserByIdDto): Promise<User> {
  
    try {
      const user=await this.getByIdUsersInterface(idToDelete)

      if(user){
        await this.userRepository.delete(idToDelete)

        return user
      }

 
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw new Error('No se pudo eliminar el usuario');
    }
  }

  async updateUsersInterface(newData: UpdateUserDto, idToUpdate:GetUserByIdDto): Promise<User> {
    const { id:idForUpdate}=idToUpdate
  
    try {
      await this.userRepository.update(idForUpdate, newData)
      const updatedUsers= await this.getByIdUsersInterface(idToUpdate)
      
      return updatedUsers;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw new Error('No se pudo actualizar el usuario');
    }
  }

  async findByEmail(dto: GetUserByEmailDto): Promise<User> {
    const { email } = dto;
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return user;
    } catch (error) {
      console.error('Error al buscar usuario por email:', error);
      throw new Error('No se pudo encontrar el usuario por email');
    }
  }

}
