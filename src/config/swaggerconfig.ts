import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Configure Swagger
export const config = new DocumentBuilder()
  .setTitle('Pet API')
  .setDescription('Documentation for the Pet API, all endpoints include route examples')
  .setVersion('1.0')
  .addTag('Auth')
  .addTag('Users') // This tag should match those used in your controllers
  .addBearerAuth() // To handle authentication tokens if using JWT
  .build();
