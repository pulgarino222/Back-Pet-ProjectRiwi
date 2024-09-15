import { Controller, Post, Get, Put, Delete, Body, Param, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { UpdateUserDto } from '../common/dto/update-user.dto';
import { GetUserByIdDto } from '../common/dto/get-by-id-user.dto';
import { User } from 'src/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Ruta para crear un nuevo usuario
  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.newUserInterface(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException('No se pudo crear el usuario');
    }
  }

  // Ruta para obtener todos los usuarios
  @Get()
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.usersService.getAllUsersInterface();
    } catch (error) {
      throw new InternalServerErrorException('No se pudo obtener los usuarios');
    }
  }

  // Ruta para obtener un usuario por ID
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    try {
      return await this.usersService.getByIdUsersInterface({ id });
    } catch (error) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  // Ruta para actualizar un usuario por ID
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      return await this.usersService.updateUsersInterface(updateUserDto, { id });
    } catch (error) {
      throw new InternalServerErrorException('No se pudo actualizar el usuario');
    }
  }

  // Ruta para eliminar un usuario por ID
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    try {
      return await this.usersService.deleteUserByIdInterface({ id });
    } catch (error) {
      throw new InternalServerErrorException('No se pudo eliminar el usuario');
    }
  }
}

