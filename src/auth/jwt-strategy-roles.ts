import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConfig } from "src/config/configurationsJwt";
import { UsersService } from "src/services/users.service"; 
import { User } from "src/entities/user.entity"; 

// Injectable decorator to allow dependency injection
@Injectable()
// JwtStrategyRols class extends PassportStrategy, using JWT Strategy
export class JwtStrategyRols extends PassportStrategy(Strategy) {
    // Constructor with dependency injection of UsersService
    constructor(private readonly usersService: UsersService) {
        // Call to parent constructor with JWT configuration
        super({
            // Extract JWT from the Authorization header as a Bearer token
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // Don't ignore token expiration
            ignoreExpiration: false,
            // Use the secret key from JWT configuration
            secretOrKey: jwtConfig().secret,
        });
    }

    // Validate method to verify and decode the JWT payload
    async validate(payload: any): Promise<any> {
      // Log the payload for debugging purposes
      console.log('Payload:', payload); 
      // Fetch user from database using the ID in the payload
      const user: User = await this.usersService.getByIdUsersInterface({ id: payload.id });
  
      // If user not found, throw an UnauthorizedException
      if (!user) {
          throw new UnauthorizedException('User not found');
      }
  
      // Create a user object with roles for the request
      const userWithRoles = {
          id: user.id,
          email: user.email,
          // Map user roles to a simplified structure
          roles: user.roles.map(role => ({
              id: role.id,
              name: role.name
          })),
      };
  
      // Log the user object for debugging
      console.log('User in validate:', userWithRoles); 
  
      // Return the user object to be attached to the request
      return userWithRoles; 
  }
}

