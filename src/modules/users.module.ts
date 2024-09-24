import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity'; 
import { UsersService } from '../services/users.service';
import { UsersController } from 'src/controllers/users.controller';
import { Role } from 'src/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]) // Import the user and role repositories
  ],
  providers: [
    UsersService // Service for user-related operations
  ],
  exports: [
    UsersService // Export UsersService for use in other modules
  ],
  controllers: [
    UsersController // Controller for handling user-related requests
  ]
})
export class UsersModule {}
