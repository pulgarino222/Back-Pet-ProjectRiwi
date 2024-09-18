import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger'; // Import Swagger decorators
import { AuthService } from './auth.service';
import { UsersService } from 'src/services/users.service';
import { CreateUserDto, LoginAuthDto } from '../dto/userDto/user.dto.barrel';

@ApiTags('Auth') // Group routes under the 'Auth' tag
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
  registerUser(@Body() newUser: CreateUserDto) {
    return this.userService.newUserInterface(newUser);
  }

  @ApiResponse({ status: 200, description: 'Login successful.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({ type: LoginAuthDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signIn: LoginAuthDto) {
    return this.authService.signIn(signIn.email, signIn.password);
  }
}


