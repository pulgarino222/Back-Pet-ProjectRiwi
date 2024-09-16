import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger'; // Importar decoradores de Swagger
import { AuthService } from './auth.service';
import { UsersService } from 'src/services/users.service';
import { CreateUserDto } from 'src/dto/dto.barrel';
import { LoginAuthDto } from 'src/dto/login-auth.dto';

@ApiTags('Auth') // Grupo de rutas bajo el tag 'Auth'
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


