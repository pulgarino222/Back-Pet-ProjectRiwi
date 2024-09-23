import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './modules/config.module';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './common/cloudinary/cloudinary.module';
import { PetsModule } from './modules/pets.module';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './common/exceptionFilters/http-exception.filter';
import { RedirectController } from './redirect.controller';
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('databaseEnvironments.host'),
        port: configService.get<number>('databaseEnvironments.port'),
        username: configService.get<string>('databaseEnvironments.username'),
        password: configService.get<string>('databaseEnvironments.password'),
        database: configService.get<string>('databaseEnvironments.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV !== 'production',
      }),
    }),
    UsersModule,
    AuthModule,
    CloudinaryModule,
    PetsModule,
  ],
  controllers: [RedirectController], 
  providers: [{
    provide: APP_FILTER,
    useClass: CustomExceptionFilter,
  }],
})
export class AppModule {}
