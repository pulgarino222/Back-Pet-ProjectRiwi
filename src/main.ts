import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { config,configCors } from './config/barrelconfig';

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  // Crear la instancia de la aplicación
  const app = await NestFactory.create(AppModule);

  // Configurar CORS
  app.enableCors(configCors());

  // Configurar Swagger
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Ruta en la que estará la documentación

  // Iniciar el servidor
  await app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log(`API documentation available at http://localhost:${PORT}/api`);
  });
}

bootstrap();


