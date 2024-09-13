import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/barrel.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    ConfigModule,
    UsersModule,
    AuthModule
  ]
})
export class AppModule {}
