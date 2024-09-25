import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config';
import { ConfigDataBase, jwtConfig } from '../config/barrelconfig';

@Module({
  imports: [
    NestConfigModule.forRoot({
      // Load configuration from ConfigDataBase and jwtConfig
      load: [ConfigDataBase, jwtConfig],
      // Make the configuration available globally throughout the application
      isGlobal: true,
    }),
  ],
  // Provide the ConfigService to be used within this module
  providers: [ConfigService],
  // Export the ConfigService so it can be used in other modules
  exports: [ConfigService],
})
// Define the ConfigModule class
export class ConfigModule {}
