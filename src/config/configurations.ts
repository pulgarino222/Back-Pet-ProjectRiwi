import { User } from "src/entities/user.entity";

// Function to configure the database and server settings
export function ConfigDataBase() {
    return {
        // Set the server port, use environment variable or default to 3001
        port: parseInt(process.env.PORT) || 3001,
        
        // Database configuration object
        databaseEnvironments: {
            type: 'mysql', // Specifies the database type as MySQL
            
            // Database connection details, using environment variables
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            
            entities: [User], // Array of entity classes, currently only includes User
            synchronize: true // Automatically synchronize database schema (caution: not recommended for production)
        }
    };
}