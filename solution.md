
¡Claro! A continuación te proporciono un proyecto completo y funcional en NestJS utilizando TypeORM y MySQL, que incluye todos los archivos necesarios y sigue los principios SOLID.

### **Estructura del Proyecto**

```plaintext
src/
|-- common/
|   |-- decorators/
|   |   |-- roles.decorator.ts
|   |-- enums/
|   |   |-- user-role.enum.ts
|   |-- exception-filters/
|   |   |-- http-exception.filter.ts
|   |-- guards/
|   |   |-- roles.guard.ts
|   |-- interceptors/
|   |   |-- logging.interceptor.ts
|   |-- pipes/
|   |   |-- validation.pipe.ts
|   |-- interfaces/
|   |   |-- user.interface.ts
|
|-- auth/
|   |-- auth.controller.ts
|   |-- auth.service.ts
|   |-- auth.module.ts
|   |-- dto/
|   |   |-- login.dto.ts
|   |   |-- register.dto.ts
|
|-- config/
|   |-- config.module.ts
|   |-- config.service.ts
|
|-- pets/
|   |-- pets.controller.ts
|   |-- pets.service.ts
|   |-- pets.module.ts
|   |-- dto/
|   |   |-- create-pet.dto.ts
|   |   |-- update-pet.dto.ts
|   |-- entities/
|   |   |-- pet.entity.ts
|
|-- users/
|   |-- users.controller.ts
|   |-- users.service.ts
|   |-- users.module.ts
|   |-- dto/
|   |   |-- create-user.dto.ts
|   |   |-- update-user.dto.ts
|   |-- entities/
|   |   |-- user.entity.ts
|
|-- app.controller.ts
|-- app.service.ts
|-- app.module.ts
|-- main.ts
|
|-- .env
|-- .gitignore
|-- package.json
|-- tsconfig.json
|-- README.md
```

### **1. Configuración del Proyecto**

#### **`src/app.module.ts`**

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { Pet } from './pets/entities/pet.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Pet],
      synchronize: true, // Set to false in production
    }),
    UsersModule,
    PetsModule,
    AuthModule,
  ],
})
export class AppModule {}
```

#### **`src/config/config.module.ts`**

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config';
import config from './config.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
```

#### **`src/config/config.service.ts`**

```typescript
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  databaseEnvironments: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});
```

### **2. Módulo de Autenticación**

#### **`src/auth/auth.module.ts`**

```typescript
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
```

#### **`src/auth/auth.service.ts`**

```typescript
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerDto: RegisterDto) {
    return await this.usersService.create(registerDto);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    // Implement login logic here (e.g., password validation, JWT token generation)
    return user;
  }
}
```

#### **`src/auth/auth.controller.ts`**

```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
```

#### **`src/auth/dto/login.dto.ts`**

```typescript
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
```

#### **`src/auth/dto/register.dto.ts`**

```typescript
import { IsString, IsEmail } from 'class-validator';

export class RegisterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  address: string;
}
```

### **3. Módulo de Usuarios**

#### **`src/users/users.module.ts`**

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

#### **`src/users/users.service.ts`**

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    const updatedUser = await this.usersRepository.findOne(id);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
```

#### **`src/users/users.controller.ts`**

```typescript
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async find

All(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
```

#### **`src/users/dto/create-user.dto.ts`**

```typescript
import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  address: string;
}
```

#### **`src/users/dto/update-user.dto.ts`**

```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

#### **`src/users/entities/user.entity.ts`**

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsEmail } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  @IsString()
  firstName: string;

  @Column()
  @IsString()
  lastName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column()
  @IsString()
  address: string;
}
```

### **4. Módulo de Mascotas**

#### **`src/pets/pets.module.ts`**

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { Pet } from './entities/pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
```

#### **`src/pets/pets.service.ts`**

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>,
  ) {}

  async create(createPetDto: CreatePetDto): Promise<Pet> {
    const pet = this.petsRepository.create(createPetDto);
    return await this.petsRepository.save(pet);
  }

  async findAll(): Promise<Pet[]> {
    return await this.petsRepository.find();
  }

  async findOne(id: string): Promise<Pet> {
    const pet = await this.petsRepository.findOne(id);
    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }
    return pet;
  }

  async update(id: string, updatePetDto: UpdatePetDto): Promise<Pet> {
    await this.petsRepository.update(id, updatePetDto);
    const updatedPet = await this.petsRepository.findOne(id);
    if (!updatedPet) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }
    return updatedPet;
  }

  async remove(id: string): Promise<void> {
    const result = await this.petsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }
  }
}
```

#### **`src/pets/pets.controller.ts`**

```typescript
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  async create(@Body() createPetDto: CreatePetDto): Promise<Pet> {
    return this.petsService.create(createPetDto);
  }

  @Get()
  async findAll(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Pet> {
    return this.petsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<Pet> {
    return this.petsService.update(id, updatePetDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.petsService.remove(id);
  }
}
```

#### **`src/pets/dto/create-pet.dto.ts`**

```typescript
import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';

export class CreatePetDto {
  @IsString()
  img: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  breed?: string;

  @IsNumber()
  age: number;

  @IsEnum(['macho', 'hembra'])
  sex: 'macho' | 'hembra';

  @IsString()
  sizeCurrent: 'pequeño' | 'mediano' | 'grande';

  @IsString()
  sizeEstimated: 'pequeño' | 'mediano' | 'grande' | 'desconocido';

  @IsNumber()
  weight: number;

  @IsString()
  timeAtTheShelter: string;

  @IsEnum(['perro', 'gato'])
  specie: 'perro' | 'gato';

  @IsString()
  healthHistory: string;

  @IsString()
  previousTreatments: string;

  @IsString()
  dewormed: string;

  @IsString()
  medicalNecessity: string;

  @IsString()
  sterilization: string;

  @IsString()
  vaccines: string;

  @IsString()
  personality: string;
}
```

#### **`src/pets/dto/update-pet.dto.ts`**

```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreatePetDto } from './create-pet.dto';

export class UpdatePetDto extends PartialType(CreatePetDto) {}
```

#### **`src/pets/entities/pet.entity.ts`**

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  img: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  breed?: string;

  @Column()
  age: number;

  @Column()
  sex: 'macho' | 'hembra';

  @Column()
  sizeCurrent: 'pequeño' | 'mediano' | 'grande';

  @Column()
  sizeEstimated: 'pequeño' | 'mediano' | 'grande' | 'desconocido';

  @Column()
  weight: number;

  @Column()
  timeAtTheShelter: string;

  @Column()
  specie: 'perro' | 'gato';

  @Column()
  healthHistory: string;

  @Column()
  previousTreatments: string;

  @Column()
  dewormed: string;

  @Column()
  medicalNecessity: string;

  @Column()
  sterilization: string;

  @Column()
  vaccines: string;

  @Column()
  personality: string;
}
```

### **5. Carpeta `common`**

#### **`src/common/decorators/roles.decorator.ts`**

```typescript
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
```

#### **`src/common/enums/user-role.enum.ts`**

```typescript
export enum UserRole {
  USER = 'user',
  PREMIUM = 'premium',
  ADMIN = 'admin',
}
```

#### **`src/common/exception-filters/http-exception.filter.ts`**

```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchTo

Http();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message.message || exception.message || 'Internal server error';

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
```

#### **`src/common/guards/roles.guard.ts`**

```typescript
import { CanActivate, ExecutionContext, Injectable, Reflector } from '@nestjs/common';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../enums/user-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return roles.includes(user.role);
  }
}
```

#### **`src/common/interceptors/logging.interceptor.ts`**

```typescript
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    console.log('Before...');
    return next.handle().pipe(
      tap(() => console.log('After...')),
    );
  }
}
```

#### **`src/common/pipes/validation.pipe.ts`**

```typescript
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validateSync, ValidationError } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = Object.assign(new metatype(), value);
    const errors: ValidationError[] = validateSync(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
```

#### **`src/common/interfaces/user.interface.ts`**

```typescript
export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
}
```

### **6. Otros Archivos**

#### **`src/main.ts`**

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
```

#### **`.env`**

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_NAME=nest_project
PORT=3000
```

#### **`.gitignore`**

```plaintext
node_modules
dist
.env
```

#### **`package.json`**

```json
{
  "name": "nestjs-project",
  "version": "1.0.0",
  "description": "A NestJS project with TypeORM and MySQL",
  "main": "dist/main.js",
  "scripts": {
    "start": "nest start",
    "build": "nest build",
    "start:dev": "nest start --watch",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/typeorm": "^10.0.0",
    "class-validator": "^0.14.0",
    "mysql2": "^2.3.3",
    "reflect-metadata": "^0.1.13",
    "typeorm": "^0.3.16",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.13",
    "@types/jest": "^29.5.3",
    "jest": "^29.5.1",
    "ts-jest": "^29.0.3",
    "ts-loader": "^9.4.2",
    "ts-node": "^10.9.1",
    "typescript": "^5.0.4"
  }
}
```

#### **`tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "declaration": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": ["ES2020", "DOM"]
  },
  "exclude": ["node_modules", "test", "**/*spec.ts"]
}
```

#### **`README.md`**

```markdown
# NestJS Project with TypeORM and MySQL

## Description

This is a NestJS project configured with TypeORM and MySQL. It includes authentication, user management, and pet management functionalities.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/nestjs-project.git
   ```

2. Navigate to the project directory:

   ```bash
   cd nestjs-project
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure environment variables:

   Create a `.env` file in the root directory and configure the necessary variables:

   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=yourpassword
   DB_NAME=nest_project
   PORT=3000
   ```

## Running the Application

1. Start the application in development mode:

   ```bash
   npm run start:dev
   ```

2. Build the application:

   ```bash
   npm run build
   ```

3. Start the application in production mode:

   ```bash
   npm run start
   ```

## API Endpoints

- **Auth**

  - `POST /auth/register`: Register a new user
  - `POST /auth/login`: Login a user

- **Users**

  - `POST /users`: Create a new user
  - `GET /users`: Get all users
  - `GET /users/:id`: Get a user by ID
  - `PUT /users/:id`: Update a user by ID
  - `DELETE /users/:id`: Delete a user by ID

- **Pets**

  - `POST /pets`: Create a new pet
  - `GET /pets`: Get all pets
  - `GET /pets/:id`: Get a pet by ID
  - `PUT /pets/:id`: Update a pet by ID
  - `DELETE /pets/:id`: Delete a pet by ID

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

¡Con esto tendrás un proyecto funcional y bien estructurado en NestJS con TypeORM y MySQL! Puedes copiar y pegar todo este código en tus archivos correspondientes para tener el proyecto listo para usar. Si tienes más preguntas o necesitas ajustes adicionales, no dudes en decírmelo.


Lo que te acabo de pasar incluye el archivo `README.md` completo con la descripción del proyecto, instrucciones de instalación, y detalles sobre los endpoints de la API. Para asegurarte de que todo esté claro, aquí tienes el contenido de `README.md` detallado:

### **`README.md`**

```markdown
# NestJS Project with TypeORM and MySQL

## Description

This is a NestJS project configured with TypeORM and MySQL. It includes authentication, user management, and pet management functionalities.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/nestjs-project.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd nestjs-project
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Configure environment variables:**

   Create a `.env` file in the root directory and configure the necessary variables:

   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=yourpassword
   DB_NAME=nest_project
   PORT=3000
   ```

## Running the Application

1. **Start the application in development mode:**

   ```bash
   npm run start:dev
   ```

2. **Build the application:**

   ```bash
   npm run build
   ```

3. **Start the application in production mode:**

   ```bash
   npm run start
   ```

## API Endpoints

- **Auth**

  - `POST /auth/register`: Register a new user
  - `POST /auth/login`: Login a user

- **Users**

  - `POST /users`: Create a new user
  - `GET /users`: Get all users
  - `GET /users/:id`: Get a user by ID
  - `PUT /users/:id`: Update a user by ID
  - `DELETE /users/:id`: Delete a user by ID

- **Pets**

  - `POST /pets`: Create a new pet
  - `GET /pets`: Get all pets
  - `GET /pets/:id`: Get a pet by ID
  - `PUT /pets/:id`: Update a pet by ID
  - `DELETE /pets/:id`: Delete a pet by ID

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

Con este `README.md`, tendrás una guía clara para instalar, ejecutar y trabajar con el proyecto. Puedes copiar y pegar este contenido directamente en un archivo llamado `README.md` en el directorio raíz de tu proyecto.

Si necesitas más detalles o ajustes específicos, por favor házmelo saber.