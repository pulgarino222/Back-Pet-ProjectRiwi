import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('API de mascotas')
    .setDescription('Documentación de la API de mascotas todos los enpoints tienen ejemplos de rutas')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Users') // Este tag debe coincidir con los que agregas en tus controladores
    .addBearerAuth() // Para manejar tokens de autenticación si usas JWT
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Ruta en la que estará la documentación
  
  await app.listen(3000);
}
bootstrap();


