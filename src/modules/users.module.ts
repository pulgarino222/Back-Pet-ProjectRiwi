import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity'; 
import { UsersService } from '../services/users.service';
import { UsersController } from 'src/controllers/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],  // import the user repository
  providers: [UsersService],
  exports: [UsersService],
  controllers:[UsersController]
})
export class UsersModule {}
