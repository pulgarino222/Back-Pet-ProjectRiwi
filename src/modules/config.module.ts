import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config';
import { ConfigDataBase, jwtConfig } from '../config/barrelconfig';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [ConfigDataBase, jwtConfig],
      isGlobal: true, // Make the configuration global
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService], // Export the ConfigService for use in other modules
})
export class ConfigModule {}
