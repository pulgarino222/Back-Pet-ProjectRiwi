import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConfig } from "src/config/configurationsJwt";
import { UsersService } from "src/services/users.service"; 
import { User } from "src/entities/user.entity"; 

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
      console.log('Payload:', payload); 
      const user: User = await this.usersService.getByIdUsersInterface({ id: payload.id });
  
      if (!user) {
          throw new UnauthorizedException('User not found');
      }
  
      const userWithRoles = {
          id: user.id,
          email: user.email,
          roles: user.roles.map(role => ({
              id: role.id,
              name: role.name
          })),
      };
  
      console.log('User in validate:', userWithRoles); 
  
      return userWithRoles; 
  }
}

