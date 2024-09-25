import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { User } from 'src/entities/user.entity';

// This guard is used to check if a user has the required role to access a resource
@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the request object from the execution context
    const request = context.switchToHttp().getRequest();
    // Extract the user from the request (set by JwtAuthGuard)
    const user: User = request.user;

    // Log the user for debugging purposes
    console.log('User in RolesGuard:', user);

    // If no user is found, throw a ForbiddenException
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    // Check if the user has the 'master' role
    const hasRole = () => user.roles.some(role => role.name === 'master'); 
    // If the user doesn't have the 'master' role, throw a ForbiddenException
    if (!hasRole()) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    // If all checks pass, allow access
    return true;
  }
}

