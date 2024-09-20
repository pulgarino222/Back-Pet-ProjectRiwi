import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from 'src/services/users.service';
import { CreateUserDto, LoginAuthDto } from '../dto/userDto/user.dto.barrel';
import { RolesGuard } from './auth-roles.guard'; // Asegúrate de que la ruta sea correcta

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  async registerUser(@Body() newUser: CreateUserDto) {
    try {
      return await this.userService.newUserInterface(newUser);
    } catch (error) {
     
      throw error; 
    }
  }

  @ApiResponse({ status: 200, description: 'Login successful.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({ type: LoginAuthDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signIn: LoginAuthDto) {
    try {
      return await this.authService.signIn(signIn.email, signIn.password);
    } catch (error) {
      throw error; 
    }
  }
}



