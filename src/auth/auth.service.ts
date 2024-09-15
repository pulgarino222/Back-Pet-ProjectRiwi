import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    // Buscar el usuario por correo electrónico
    const user = await this.usersService.findByEmail({ email });

    // Verificar la contraseña
    if (user?.password !== pass) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Crear el payload para el token JWT
    const payload = {
      sub: user.id, // Cambié `user.userId` a `user.id` para coincidir con el campo en tu entidad `User`
      email: user.email,
    };

    // Generar y devolver el token JWT
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}





