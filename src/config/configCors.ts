import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export function configCors(): CorsOptions {
  // Get allowed origins from environment variable or use default
  const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3000'];

  return {
    // Set the allowed origins for CORS
    origin: allowedOrigins,

    // Define the HTTP methods allowed for CORS requests
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

    // Specify the headers that are allowed in CORS requests
    allowedHeaders: 'Content-Type, Accept, Authorization',
  };
}