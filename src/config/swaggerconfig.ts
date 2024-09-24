import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Configure Swagger
export const config = new DocumentBuilder()
  .setTitle('Pet API')
  .setDescription('Documentation for the Pet API, all endpoints include route examples')
  .setVersion('1.0')
  .addTag('Auth')
  .addTag('Users')
  .addTag('Pets') 
  .addBearerAuth()
  .build();