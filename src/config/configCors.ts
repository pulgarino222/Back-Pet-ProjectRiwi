import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';


export function configCors():CorsOptions{
    const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3000'];
    return{
        origin: allowedOrigins,//url del front
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',//metodos permitidos
        allowedHeaders: 'Content-Type, Accept',//permitir conetnidos alojados en los headers
      }
}