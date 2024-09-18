import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { config, configCors } from './config/barrelconfig';


const PORT = process.env.PORT || 3001;
async function bootstrap() {
  // Create the application instance
  const app = await NestFactory.create(AppModule);


  // Configure CORS
  app.enableCors(configCors());

  // Configure Swagger
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Path where the documentation will be available

  // Start the server
  await app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log(`API documentation available at http://localhost:${PORT}/api`);
  });
}

bootstrap();


