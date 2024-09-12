// config/config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config';
import config from '../config/configurations';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [config],
      isGlobal: true, // Si deseas que la configuración esté disponible en toda la aplicación
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}

