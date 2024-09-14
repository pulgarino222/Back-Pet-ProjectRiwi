

### Estructura del Proyecto

```
nestjs-project/
│
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── dto/
│   │   │   ├── auth.dto.ts
│   │   ├── auth.module.ts
│   │
│   ├── common/
│   │   ├── decorators/
│   │   │   └── roles.decorator.ts
│   │   ├── enums/
│   │   │   └── user-role.enum.ts
│   │   ├── exception-filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── guards/
│   │   │   └── roles.guard.ts
│   │   ├── interceptors/
│   │   │   └── logging.interceptor.ts
│   │   ├── pipes/
│   │   │   └── validation.pipe.ts
│   │   ├── interfaces/
│   │       └── user.interface.ts
│   │
│   ├── users/
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   ├── update-user.dto.ts
│   │   │   └── user-response.dto.ts
│   │   ├── user.entity.ts
│   │   ├── user.service.ts
│   │   ├── user.controller.ts
│   │   ├── user.module.ts
│   │
│   ├── pets/
│   │   ├── dto/
│   │   │   ├── create-pet.dto.ts
│   │   │   ├── update-pet.dto.ts
│   │   │   └── pet-response.dto.ts
│   │   ├── pet.entity.ts
│   │   ├── pet.service.ts
│   │   ├── pet.controller.ts
│   │   ├── pet.module.ts
│   │
│   ├── config/
│   │   ├── configurations.ts
│   │   ├── config.module.ts
│   │
│   ├── app.module.ts
│   ├── main.ts
│
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

### Contenidos de los Archivos

#### **`src/users/user.entity.ts`**

```typescript
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pet } from '../pets/pet.entity';
import { UserRole } from '../../common/enums/user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => Pet, (pet) => pet.user)
  pets: Pet[];
}
```

#### **`src/pets/pet.entity.ts`**

```typescript
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column('json', { nullable: true })
  size?: {
    current: 'pequeño' | 'mediano' | 'grande';
    estimated: 'pequeño' | 'mediano' | 'grande' | 'desconocido';
  };

  @Column()
  weight: number;

  @Column()
  time_at_the_shelter: string;

  @Column()
  specie: 'perro' | 'gato';

  @Column()
  health_history: string;

  @Column('json')
  health: {
    previous_treatments: string;
    dewormed: string;
    medical_necessity: string;
    sterilization: string;
    vaccines: string;
  };

  @Column({ nullable: true })
  personality?: string;

  @ManyToOne(() => User, (user) => user.pets)
  user: User;
}
```

#### **`src/users/dto/create-user.dto.ts`**

```typescript
import { IsString, IsEmail, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../../common/enums/user-role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly address?: string;

  @IsEnum(UserRole)
  @IsOptional()
  readonly role?: UserRole;
}
```

#### **`src/users/dto/update-user.dto.ts`**

```typescript
import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../../common/enums/user-role.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  readonly lastName?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly password?: string;

  @IsOptional()
  @IsString()
  readonly address?: string;

  @IsOptional()
  @IsEnum(UserRole)
  readonly role?: UserRole;
}
```

#### **`src/users/dto/user-response.dto.ts`**

```typescript
import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../../common/enums/user-role.enum';

export class UserResponseDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly address?: string;

  @IsOptional()
  @IsEnum(UserRole)
  readonly role?: UserRole;
}
```

#### **`src/pets/dto/create-pet.dto.ts`**

```typescript
import { IsString, IsInt, IsOptional, IsEnum, IsObject, Min, Max } from 'class-validator';

export class CreatePetDto {
  @IsString()
  readonly img: string;

  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly breed?: string;

  @IsInt()
  @Min(0)
  readonly age: number;

  @IsEnum(['macho', 'hembra'])
  readonly sex: 'macho' | 'hembra';

  @IsOptional()
  @IsObject()
  readonly size?: {
    current: 'pequeño' | 'mediano' | 'grande';
    estimated: 'pequeño' | 'mediano' | 'grande' | 'desconocido';
  };

  @IsInt()
  @Min(0)
  readonly weight: number;

  @IsString()
  readonly time_at_the_shelter: string;

  @IsEnum(['perro', 'gato'])
  readonly specie: 'perro' | 'gato';

  @IsString()
  readonly health_history: string;

  @IsObject()
  readonly health: {
    previous_treatments: string;
    dewormed: string;
    medical_necessity: string;
    sterilization: string;
    vaccines: string;
  };

  @IsOptional()
  @IsString()
  readonly personality?: string;
}
```

#### **`src/pets/dto/update-pet.dto.ts`**

```typescript
import { IsString, IsInt, IsOptional, IsEnum, IsObject, Min, Max } from 'class-validator';

export class UpdatePetDto {
  @IsOptional()
  @IsString()
  readonly img?: string;

  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly breed?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  readonly age?: number;

  @IsOptional()
 

 @IsEnum(['macho', 'hembra'])
  readonly sex?: 'macho' | 'hembra';

  @IsOptional()
  @IsObject()
  readonly size?: {
    current: 'pequeño' | 'mediano' | 'grande';
    estimated: 'pequeño' | 'mediano' | 'grande' | 'desconocido';
  };

  @IsOptional()
  @IsInt()
  @Min(0)
  readonly weight?: number;

  @IsOptional()
  @IsString()
  readonly time_at_the_shelter?: string;

  @IsOptional()
  @IsEnum(['perro', 'gato'])
  readonly specie?: 'perro' | 'gato';

  @IsOptional()
  @IsString()
  readonly health_history?: string;

  @IsOptional()
  @IsObject()
  readonly health?: {
    previous_treatments: string;
    dewormed: string;
    medical_necessity: string;
    sterilization: string;
    vaccines: string;
  };

  @IsOptional()
  @IsString()
  readonly personality?: string;
}
```

#### **`src/pets/dto/pet-response.dto.ts`**

```typescript
import { IsString, IsInt, IsOptional, IsEnum, IsObject } from 'class-validator';

export class PetResponseDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly img: string;

  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly breed?: string;

  @IsInt()
  readonly age: number;

  @IsEnum(['macho', 'hembra'])
  readonly sex: 'macho' | 'hembra';

  @IsOptional()
  @IsObject()
  readonly size?: {
    current: 'pequeño' | 'mediano' | 'grande';
    estimated: 'pequeño' | 'mediano' | 'grande' | 'desconocido';
  };

  @IsInt()
  readonly weight: number;

  @IsString()
  readonly time_at_the_shelter: string;

  @IsEnum(['perro', 'gato'])
  readonly specie: 'perro' | 'gato';

  @IsString()
  readonly health_history: string;

  @IsObject()
  readonly health: {
    previous_treatments: string;
    dewormed: string;
    medical_necessity: string;
    sterilization: string;
    vaccines: string;
  };

  @IsOptional()
  @IsString()
  readonly personality?: string;

  @IsString()
  readonly userId: string; // ID del User asociado
}
```

### Otros Archivos Relevantes

#### **`src/app.module.ts`**

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Pet } from './pets/pet.entity';
import { UserModule } from './users/user.module';
import { PetModule } from './pets/pet.module';
import { ConfigModule as AppConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Pet],
      synchronize: true,
    }),
    UserModule,
    PetModule,
  ],
})
export class AppModule {}
```

#### **`src/main.ts`**

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Add global validation pipe
  await app.listen(3000);
}
bootstrap();
```

#### **`src/config/configurations.ts`**

```typescript
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  databaseEnvironments: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});
```

#### **`src/config/config.module.ts`**

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config';
import config from './configurations';

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

#### **`README.md`**

```markdown
# NestJS Project

## Tecnologías

- NestJS
- TypeORM
- MySQL
- class-validator

## Instalación

1. Clona el repositorio.
2. Ejecuta `npm install` para instalar las dependencias.
3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_NAME=yourdatabase
```

4. Ejecuta `npm run start:dev` para iniciar el servidor en modo de desarrollo.

## Estructura del Proyecto

- **`src/`**: Carpeta principal del código fuente.
  - **`auth/`**: Autenticación.
  - **`common/`**: Decoradores, enums, filtros de excepciones, guards, interceptores, pipes, e interfaces comunes.
  - **`users/`**: Gestión de usuarios.
  - **`pets/`**: Gestión de mascotas.
  - **`config/`**: Configuración global de la aplicación.
  - **`app.module.ts`**: Módulo raíz.
  - **`main.ts`**: Punto de entrada de la aplicación.

## Entidades y Relaciones

- **User**: Entidad que representa una fundación. Tiene una relación uno-a-muchos con **Pet**.
- **Pet**: Entidad que representa una mascota. Tiene una relación muchos-a-uno con **User**.

## DTOs

- **`users/`**: DTOs para la entidad User.
- **`pets/`**: DTOs para la entidad Pet.

## Ejecución

- **Desarrollo**: `npm run start:dev`
- **Producción**: `npm run start`

```
