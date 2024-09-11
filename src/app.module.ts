import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hacer que ConfigModule esté disponible en toda la aplicación
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10), // toma el valor del puerto para la base de datos desde el entorno, lo convierte en un número entero y lo asigna a la propiedad port.
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true, // No recomendado en producción, pero útil en desarrollo
    }),
  ],
})
export class AppModule {}
