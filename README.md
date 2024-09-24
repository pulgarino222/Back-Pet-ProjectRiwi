# Back-Pet-ProjectRiwi
The Pet Adoption Program aims to improve the lives of animals and people by facilitating meaningful connections between them. With an efficient and supportive process, we are committed to ensuring loving homes for every pet, positively impacting countless families and animals.


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
