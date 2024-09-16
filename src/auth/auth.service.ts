import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}


  async signIn(email: string, pass: string): Promise<{
    data:User
    access_token: string
  }> {

    const user = await this.usersService.findByEmail({ email });
    if (!user) {
      new HttpException('user not found', 404)
    }

    const validationPassword = await compare(pass, user.password)//true o false

    if (!validationPassword) {
      new HttpException('wrong password', 403)
      throw new UnauthorizedException('Credenciales incorrectas');
      
    }
    const information = user


    // el payload para el token JWT
    const payload = {
      id: user.id, 
      email: user.email,
    };

    // Generar y devolver el token JWT
    return {
      data:information,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}





