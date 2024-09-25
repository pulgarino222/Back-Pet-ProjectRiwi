import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from 'src/services/users.service';
import { CreateUserDto, LoginAuthDto } from '../dto/userDto/user.barrel';
import { RolesGuard } from './auth-roles.guard';

// Define the controller for authentication-related endpoints
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  // Endpoint for user registration
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  async registerUser(@Body() newUser: CreateUserDto) {
    try {
      // Call the user service to create a new user
      return await this.userService.newUserInterface(newUser);
    } catch (error) {
      // Re-throw any errors that occur during registration
      throw error; 
    }
  }

  // Endpoint for user login
  @ApiResponse({ status: 200, description: 'Login successful.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({ type: LoginAuthDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signIn: LoginAuthDto) {
    try {
      // Call the auth service to authenticate the user
      return await this.authService.signIn(signIn.email, signIn.password);
    } catch (error) {
      // Re-throw any errors that occur during sign-in
      throw error; 
    }
  }
}



