import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity'; 
import { UsersService } from '../services/users.service';
import { UsersController } from 'src/controllers/users.controller';
import { Role } from 'src/entities/role.entity';

// Define the UsersModule using the @Module decorator
@Module({
  imports: [
    // Import TypeOrmModule and specify the entities to be used (User and Role)
    TypeOrmModule.forFeature([User, Role])
  ],
  providers: [
    // Register the UsersService as a provider for dependency injection
    UsersService
  ],
  exports: [
    // Export UsersService to make it available for use in other modules
    UsersService
  ],
  controllers: [
    // Register the UsersController to handle HTTP requests related to users
    UsersController
  ]
})
// Export the UsersModule class for use in the application
export class UsersModule {}
