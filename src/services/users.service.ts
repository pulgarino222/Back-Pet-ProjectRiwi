import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from 'src/common/interface/user.interface';
import { GetUserByIdDto } from 'src/common/dto/get-by-id-user.dto';
import { UpdateUserDto } from 'src/common/dto/update-user.dto';
import { GetUserByEmailDto } from 'src/common/dto/fin-by-email.dto';
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
      const passwordEncript = await hash(password, 10); // Encriptar la contraseña
      user = { ...user, password: passwordEncript };
      const newUser = this.userRepository.create(user);
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw new InternalServerErrorException('No se pudo crear el usuario');
    }
  }

  async getAllUsersInterface(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw new InternalServerErrorException('No se pudo obtener los usuarios');
    }
  }

  async getByIdUsersInterface(dto: GetUserByIdDto): Promise<User> {
    const { id } = dto;
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      return user;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw new InternalServerErrorException('No se pudo obtener el usuario');
    }
  }

  async deleteUserByIdInterface(idToDelete: GetUserByIdDto): Promise<User> {
    try {
      const user = await this.getByIdUsersInterface(idToDelete);

      if (user) {
        await this.userRepository.delete(user.id); // Usar el id del usuario para eliminar
        return user;
      }

      throw new NotFoundException('Usuario no encontrado para eliminar');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw new InternalServerErrorException('No se pudo eliminar el usuario');
    }
  }

  async updateUsersInterface(newData: UpdateUserDto, idToUpdate: GetUserByIdDto): Promise<User> {
    const { id: idForUpdate } = idToUpdate;

    try {
      const user = await this.getByIdUsersInterface({ id: idForUpdate });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado para actualizar');
      }

      // Encriptar la nueva contraseña si se proporciona
      if (newData.password) {
        newData.password = await hash(newData.password, 10);
      }

      // Actualizar el usuario
      await this.userRepository.update(idForUpdate, newData);

      // Retornar el usuario actualizado
      return this.userRepository.findOne({ where: { id: idForUpdate } });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw new InternalServerErrorException('No se pudo actualizar el usuario');
    }
  }
  async findByEmail(dto: GetUserByEmailDto): Promise<User> {
    const { email } = dto;
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      console.error('Error al buscar usuario por email:', error);
      throw new InternalServerErrorException('No se pudo encontrar el usuario por email');
    }
  }
}
