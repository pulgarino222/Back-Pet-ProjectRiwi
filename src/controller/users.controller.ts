import { UsersService } from '../services/users.service';
import { Body, Controller, Post, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { User } from 'src/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private userService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async newUserController(@Body() create: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.userService.createUser(create);
      return newUser;
    } catch (error) {
      console.error('Error en el controlador al crear usuario:', error);
      throw new Error('No se pudo crear el usuario');
    }
  }
}

