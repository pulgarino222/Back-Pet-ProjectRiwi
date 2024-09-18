import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './modules/config.module'; // Asegúrate que esta ruta sea correcta
import { ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './common/cloudinary/cloudinary.module';
import { PetsModule } from './modules/pets.module';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './common/exceptionFilters/http-exception.filter';

@Module({
  imports: [
    // Importamos el ConfigModule
    ConfigModule,
    
    // Configuramos TypeOrmModule usando valores del ConfigService
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
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Para cargar entidades
        synchronize: configService.get<boolean>('databaseEnvironments.synchronize'),
      }),
    }),
    UsersModule,
    AuthModule,
    CloudinaryModule,
    PetsModule
  ],

  providers:[{
    provide:APP_FILTER,
    useClass:CustomExceptionFilter

  }]
  // otros metadatos del módulo
})
export class AppModule {}