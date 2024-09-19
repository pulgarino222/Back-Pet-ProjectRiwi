import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { User } from 'src/entities/user.entity';

@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user; // Aquí obtenemos el usuario del request
    const hasRole = () => user.roles.some(role => role.name === 'master'); 
    if (!user || !hasRole()) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }
    return true;
  }
}
