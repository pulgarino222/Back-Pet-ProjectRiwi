import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConfig } from "src/config/configurationsJwt";
import { UsersService } from "src/services/users.service"; // Asegúrate de que la ruta sea correcta
import { User } from "src/entities/user.entity"; // Importa la entidad User

@Injectable()
export class JwtStrategyRols extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: jwtConfig().secret,
        });
      }

      async validate(payload: any): Promise<any> {
        // Busca el usuario en la base de datos usando el ID del payload
        const user: User = await this.usersService.getByIdUsersInterface(payload.id);

        if (!user) {
          // Si no se encuentra el usuario, puedes lanzar una excepción
          throw new UnauthorizedException('User not found');
        }

        // Retorna el usuario junto con sus roles
        return {
          id: user.id,
          email: user.email,
          roles: user.roles, // Asegúrate de que roles esté definido
        };
      }
}
