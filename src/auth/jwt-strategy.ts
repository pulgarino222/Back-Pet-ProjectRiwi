import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConfig } from "src/config/configurationsJwt";

// This decorator marks the class as a provider that can be managed by Nest's dependency injection container
@Injectable()
// JwtStrategy extends PassportStrategy and uses the JWT strategy
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        // Call the parent constructor with the strategy configuration
        super({
          // Extract the JWT from the Authorization header as a Bearer token
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          // Don't ignore the expiration of the token
          ignoreExpiration: false,
          // Use the secret key from the JWT configuration
          secretOrKey: jwtConfig().secret,
        });
    }

    // This method is called after the token is verified
    // It receives the decoded JWT payload
    async validate(payload: any): Promise<any> {
        // Return an object with the user's id and email from the payload
        // This will be attached to the Request object as req.user
        return { id: payload.id, email: payload.email };
    }
}
