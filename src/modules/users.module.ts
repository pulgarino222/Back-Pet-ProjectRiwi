
import { Module } from '@nestjs/common';
import { usersService } from '../services/user.service';
import { UsersService } from 'src/services/users.service';

@Module({
  providers: [usersService],
  exports: [usersService],
})
export class UsersModule {}

