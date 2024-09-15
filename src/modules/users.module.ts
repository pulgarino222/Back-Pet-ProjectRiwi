import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity'; // Asegúrate de que la ruta sea correcta
import { UsersService } from '../services/users.service';
import { UsersController } from 'src/controller/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],  // Importa el repositorio de User
  providers: [UsersService],
  exports: [UsersService],
  controllers:[UsersController]
})
export class UsersModule {}
