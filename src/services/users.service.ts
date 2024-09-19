import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from '../dto/userDto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from '../common/interface/userInterface/interfaces.barrel';
import { GetUserByEmailDto, UpdateUserDto, GetUserByIdDto } from '../dto/userDto/user.dto.barrel';
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

  async newUserInterface(user: CreateUserDto): Promise<User> {
    try {
      const { password, roles } = user;
      const encryptedPassword = await hash(password, 10);
  
      // Convertir los IDs de roles a entidades de Role
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
        roles: roleEntities, // Asignar roles como objetos
      });
  
      return await this.userRepository.save(newUser); // Guardar el nuevo usuario
    } catch (error) {
      console.error('Error creating the user:', error);
      throw new InternalServerErrorException('Unable to create the user');
    }
  }

  async getAllUsersInterface(): Promise<User[]> {
    try {
      return await this.userRepository.find({ relations: ['roles'] }); // Cargar roles
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
        relations: ['roles'], // Asegúrate de incluir los roles aquí
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
        await this.userRepository.delete(user.id);
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
  
      // Encriptar la nueva contraseña si se proporciona
      if (newData.password) {
        newData.password = await hash(newData.password, 10);
      }
  
      // Convertir roles de IDs a entidades Role si se proporcionan
      let roleEntities = user.roles; // Mantener roles existentes por defecto
      if (newData.roles) {
        roleEntities = await Promise.all(
          newData.roles.map(async (roleId) => {
            const role = await this.roleRepository.findOne({ where: { id: roleId } });
            if (!role) {
              throw new NotFoundException(`Role with ID ${roleId} not found`);
            }
            return role;
          })
        );
      }
  
      // Actualizar los datos del usuario
      await this.userRepository.update(idForUpdate, {
        ...user,
        ...newData,
        roles: roleEntities, // Asignar roles convertidos
      });
  
      // Retornar el usuario actualizado
      return await this.userRepository.findOne({
        where: { id: idForUpdate },
        relations: ['roles'], // Asegúrate de incluir los roles
      });
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
        relations: ['roles'], // Asegúrate de incluir los roles
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
