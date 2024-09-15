import { User } from "src/entities/user.entity";

export function ConfigDataBase() {
    return {
        port: parseInt(process.env.PORT) || 3001,
        databaseEnvironments: {
            type:'mysql',
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities:[User],
            synchronize:true
        }
    };
}