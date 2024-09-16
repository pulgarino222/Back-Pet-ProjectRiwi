import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



// Configurar Swagger
export const config = new DocumentBuilder()
.setTitle('API de mascotas')
.setDescription('Documentación de la API de mascotas todos los enpoints tienen ejemplos de rutas')
.setVersion('1.0')
.addTag('Auth')
.addTag('Users') // Este tag debe coincidir con los que agregas en tus controladores
.addBearerAuth() // Para manejar tokens de autenticación si usas JWT
.build();