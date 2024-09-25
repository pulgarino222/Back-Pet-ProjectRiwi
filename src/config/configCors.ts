import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export function configCors(): CorsOptions {
  const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3000'];
  return {
    origin: allowedOrigins, // Frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    allowedHeaders: 'Content-Type, Accept, Authorization', // Allowed headers
  };
}
