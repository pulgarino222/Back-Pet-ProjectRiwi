import { Controller, Post, Get, Put, Delete, Body, Param, NotFoundException, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../common/dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth() // Añade soporte para autenticación JWT
@ApiTags('Users') // Agrupa las rutas bajo "Users" en Swagger
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Ruta para obtener todos los usuarios
  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Usuarios obtenidos con éxito', type: [User] })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.usersService.getAllUsersInterface();
    } catch (error) {
      throw new InternalServerErrorException('No se pudo obtener los usuarios');
    }
  }

  // Ruta para obtener un usuario por ID
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: String })
  @ApiResponse({ status: 200, description: 'Usuario obtenido con éxito', type: User })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async getUserById(@Param('id') id: string): Promise<User> {
    try {
      return await this.usersService.getByIdUsersInterface({ id });
    } catch (error) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  // Ruta para actualizar un usuario por ID
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: String })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Usuario actualizado con éxito', type: User })
  @ApiResponse({ status: 500, description: 'Error al actualizar el usuario' })
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
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: String })
  @ApiResponse({ status: 200, description: 'Usuario eliminado con éxito', type: User })
  @ApiResponse({ status: 500, description: 'Error al eliminar el usuario' })
  async deleteUser(@Param('id') id: string): Promise<User> {
    try {
      return await this.usersService.deleteUserByIdInterface({ id });
    } catch (error) {
      throw new InternalServerErrorException('No se pudo eliminar el usuario');
    }
  }
}
