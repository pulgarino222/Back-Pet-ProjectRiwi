import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// This decorator marks the class as injectable, allowing it to be used as a provider in NestJS
@Injectable()
// JwtAuthGuard extends the AuthGuard class, specifically using the 'jwt' strategy
export class JwtAuthGuard extends AuthGuard('jwt') {
    // The class is currently empty, inheriting all functionality from AuthGuard('jwt')
    // You can add custom logic here if needed, such as handling specific authentication scenarios
}
