import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/modules/users.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { jwtConfig } from 'src/config/configurationsJwt'
import { JwtStrategyRols } from './jwt-strategy-roles'
import { JwtStrategy } from './jwt-strategy'

@Module({
  imports: [
    // Configure and load JWT configuration globally
    ConfigModule.forRoot({
      load: [jwtConfig],
      isGlobal: true, 
    }),
    // Import the UsersModule for user-related functionality
    UsersModule,
    // Configure JWT module asynchronously
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        // Get JWT secret from configuration
        secret: configService.get<string>('secret'),
        // Get JWT sign options from configuration
        signOptions: configService.get('signOptions'),
      }),
    }),
  ],
  // Define providers for dependency injection
  providers: [AuthService, JwtStrategyRols, JwtStrategy],
  // Define the controller for handling authentication-related requests
  controllers: [AuthController],
  // Export AuthService to be used in other modules
  exports: [AuthService],
})
export class AuthModule {}
