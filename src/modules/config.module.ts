// config/config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config';
import {ConfigDataBase,jwtConfig } from '../config/barrelconfig'

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [ConfigDataBase,jwtConfig],
      isGlobal: true, 
      
    }),

    
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}

