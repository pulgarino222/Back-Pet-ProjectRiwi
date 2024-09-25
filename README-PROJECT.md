# Pet Adoption Manager (PAM)

## Proyecto Final - Riwi

### Integrantes del Equipo
- **Andrés Cano Rave**  
- **Deybison Camilo Sepúlveda**  
- **Santiago Londoño**  
- **Emanuel Estrada Muñoz**  
- **Alexis Soto Barreiro**  
- **Felipe Pulgarín**  

## Clan: Jeff Bezos

## Descripción del Proyecto
**Pet Adoption Manager (PAM)** es una aplicación web diseñada para facilitar la adopción de perros y gatos en el Valle de Aburrá. La plataforma centraliza la información de diversas fundaciones, ayudando a los adoptantes a encontrar fácilmente a sus futuros compañeros y simplificando el proceso de adopción.

## Contenido
1. [Objetivo General](#objetivo-general)
2. [Planteamiento del Problema](#planteamiento-del-problema)
3. [Alcance del Proyecto](#alcance-del-proyecto)
4. [Logo del Proyecto](#logo-del-proyecto)
5. [Slogan](#slogan)
6. [Título del Proyecto Producto](#título-del-proyecto-producto)
7. [Integrantes del Grupo](#integrantes-del-grupo)
8. [Variables de Entorno](#variables-de-entorno)
9. [Modelo de Base de Datos](#modelo-de-base-de-datos)
10. [Modelos UML de Clases](#modelos-uml-de-clases)
11. [Modelo Arquitectura de Componentes](#modelo-arquitectura-de-componentes)
12. [Casos de Uso](#casos-de-uso)
13. [Historias de Usuario - Epics](#historias-de-usuario---epics)
14. [Requerimientos Funcionales](#requerimientos-funcionales)
15. [Requerimientos No Funcionales](#requerimientos-no-funcionales)
16. [Enlace a Tableros de Gestión del Proyecto](#enlace-a-tableros-de-gestión-del-proyecto)
17. [Enlace a Prototipo del Proyecto](#enlace-a-prototipo-del-proyecto)

---

## Objetivo General
Desarrollar una página web que permita a los usuarios buscar y adoptar perros y gatos que se encuentran en un hogar temporal en el Valle de Aburrá, facilitando el contacto entre los adoptantes y las organizaciones de protección animal.

## Planteamiento del Problema
En el Valle de Aburrá, muchas personas quieren adoptar una mascota, pero la información sobre los animales disponibles está dispersa entre diferentes fundaciones. Esto complica el proceso de adopción, haciendo que sea confuso y frustrante para los interesados. Nuestra solución es centralizar toda la información en una sola aplicación web.

## Alcance del Proyecto
El proyecto presentará un MVP (Producto Mínimo Viable) que centralice la información de diversas fundaciones del Valle de Aburrá para que los usuarios puedan obtener información unificada y realizar la adopción de mascotas.

Si se aprueba el MVP, los próximos pasos incluirán:
- Búsqueda de mascotas por raza, edad, tamaño, sexo, ubicación y necesidades especiales.
- Visualización de perfiles detallados de cada mascota con fotos e información relevante.
- Sistema de "match" para facilitar la adopción.
- Gestión de solicitudes de adopción y comunicación con los adoptantes.

## Logo del Proyecto
![image](https://github.com/user-attachments/assets/d3abee25-baf5-4660-8047-7f5d5d2d0194)  

## Slogan
**"Más que una adopción, es un propósito."**

## Título del Proyecto Producto
**Pet Adoption Manager (PAM)**

### ¿Por qué?
PAM nace de la necesidad de simplificar el proceso de adopción de mascotas, permitiendo a los interesados acceder fácilmente a información sobre varios puntos de adopción.

### ¿Para qué?
Con PAM, los usuarios pueden explorar opciones y encontrar a su próximo compañero de vida sin tener que visitar cada fundación de manera individual.

### ¿Para quién?
Está dirigido a personas y familias que desean adoptar mascotas, proporcionándoles una plataforma para simplificar el proceso.

## Integrantes del Grupo
| Integrante                   | Email                                    | LinkedIn                                                                                     | GitHub          |
| ---------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------- | --------------- |
| **Emanuel Estrada Muñoz**     | emanu6a@gmail.com                        | N/A                                                                                          | coder-emanuel   |
| **Alexis Soto Barreiro**      | soto.alexis.8810@gmail.com               | [Alexis Soto LinkedIn](https://www.linkedin.com/in/alexis-soto-barreiro-6a898a219/)           | sotomen10       |
| **Juan Felipe Pulgarin**      | pulgarinhernandezjuanfelipe.gmail.com    | [Juan Felipe LinkedIn](https://www.linkedin.com/in/juan-felipe-pulgarin-hernandez-10b5b330a/) | pulgarino222    |
| **Andrés Cano Rave**          | a.canorave@gmail.com                     | [Andrés Cano LinkedIn](https://www.linkedin.com/in/andr%C3%A9s-cano-rave-019445153/)          | cano1988        |
| **Santiago Londoño**          | santiago.londono07@gmail.com             | [Santiago Londoño LinkedIn](https://www.linkedin.com/in/san7imo/)                             | san7ilo         |
| **Deybison Sepulveda**        | camimilo2014@gmail.com                   | [Deybison Sepulveda LinkedIn](https://www.linkedin.com/in/deybison-sepulveda/)                | Camilo1599      |

# Proyecto de Aplicación para Adopción de Mascotas

## Documentación de los Endpoints

Puedes encontrar la documentación completa de los endpoints a través de Swagger en el siguiente enlace:

[Documentación Swagger](https://back-pet-projectriwi-production.up.railway.app/api)



## Diagrama UML

![image](https://github.com/user-attachments/assets/bb0a03ce-fe1f-4edc-871e-7eb8524e32d8) 

## Modelo de Base de Datos

![image](https://github.com/user-attachments/assets/3d973ac3-2014-4ad4-8831-0014e7fd59b0)

### Modelos UML de Clases

![image](https://github.com/user-attachments/assets/6156556f-d1a6-485d-abf5-f181d7e3c8ba)

## Modelo de Arquitectura de Componentes

La arquitectura del proyecto utiliza el patrón Modelo-Vista-Controlador (MVC) tanto en el front-end como en el back-end. 

![image](https://github.com/user-attachments/assets/bae4911d-ca65-4f91-96b1-b49d2193c057)

### ¿Qué es MVC?

El MVC o Modelo-Vista-Controlador es un patrón de arquitectura de software que separa la lógica de la aplicación de la lógica de la vista. Este patrón se divide en tres componentes principales:

- **Modelo**: Representa la estructura de los datos y la lógica de negocio.
- **Vista**: Es la interfaz de usuario que presenta los datos al usuario final.
- **Controlador**: Actúa como intermediario entre el Modelo y la Vista, gestionando la entrada del usuario y actualizando el Modelo o la Vista en consecuencia.

El uso de MVC es importante ya que permite mantener una clara separación de responsabilidades y facilita la escalabilidad y el mantenimiento del software. La mayoría de los frameworks modernos utilizan MVC o alguna adaptación del mismo para la arquitectura de aplicaciones.


## Casos de Uso Principales
1. **Visualizar perros y gatos disponibles para adopción**  
   - Actor: Usuario visitante.
   - Flujo: Ver lista de mascotas, filtrar por especie, raza, edad, etc.
   
2. **Enviar formulario de contacto para adopción**  
   - Actor: Usuario visitante.
   - Flujo: Enviar un formulario de contacto para adoptar una mascota.

3. **Registro de mascota por el usuario master**  
   - Actor: Usuario master.
   - Flujo: Registrar una nueva mascota disponible para adopción.

4. **Registro de usuario master**  
   - Actor: Administrador del sistema.
   - Flujo: Registrar un nuevo usuario master.

5. **Gestión de mascotas**  
   - Actor: Usuario master.
   - Flujo: Actualizar o eliminar mascotas registradas.
  


# Historias de Usuario - Epics

## EPICS BACKEND

### Users
- **Crear Usuario**: Implementar la funcionalidad para registrar nuevos usuarios.
- **Implementar Excepciones**: Manejar errores y excepciones durante las operaciones con usuarios.
- **Listar Usuarios**: Obtener una lista de todos los usuarios registrados.
- **Actualizar Perfil**: Permitir a los usuarios actualizar su información personal.
- **Iniciar Sesión**: Implementar la funcionalidad para que los usuarios inicien sesión.
- **Implementar Controladores**: Desarrollar controladores para gestionar las solicitudes de los usuarios.
- **Implementar Validaciones**: Validar los datos ingresados por los usuarios.

### Database
- **Creación Diagrama de Clases**: Diseñar un diagrama de clases para la base de datos.
- **Implementación de Base de Datos**: Crear la base de datos según el modelo definido.
- **Implementación de UML**: Implementar el modelo UML en la base de datos.

### Pets
- **Eliminar Mascota**: Permitir la eliminación de registros de mascotas.
- **Actualizar Información de una Mascota**: Facilitar la actualización de los datos de las mascotas.

### Pet-photo
- **Subir una Foto de Mascotas**: Implementar la funcionalidad para que los usuarios suban fotos de sus mascotas.

## EPICS FRONTEND

### User
- **Registrar Nuevo Usuario**: Implementar el formulario para el registro de nuevos usuarios.
- **Iniciar Sesión de Usuario**: Desarrollar la interfaz para que los usuarios inicien sesión.

### Pet
- **CRUD de Mascota**: Permitir las operaciones de Crear, Leer, Actualizar y Eliminar (CRUD) en la gestión de mascotas.
- **Eliminar Mascota**: Implementar la funcionalidad para eliminar registros de mascotas.
- **Ver Lista de Mascotas Disponibles**: Mostrar una lista de todas las mascotas disponibles para adopción.
- **Ver Detalles de una Mascota**: Proporcionar información detallada sobre cada mascota.

### Organization
- **CRUD de Fundación**: Permitir las operaciones CRUD para gestionar las fundaciones.

### Pet-photo
- **Actualizar Información de Mascota**: Facilitar la actualización de la información y fotos de las mascotas.



## Requerimientos Funcionales
1. **CRUD para Usuarios (Usuario Master)**
   - Crear, listar, actualizar y eliminar usuarios.
2. **CRUD para Mascotas (Usuario Master)**
   - Crear, listar, actualizar y eliminar mascotas.
3. **Acceso a Mascotas (Usuario visitante)**
   - Ver la lista de mascotas disponibles para adopción.
4. **Registro de Usuarios**
   - Permitir registro de nuevos usuarios.

## Requerimientos No Funcionales
1. **Usabilidad**
   - Interfaz intuitiva y fácil de navegar.
2. **Rendimiento**
   - Carga rápida de la página.
3. **Seguridad**
   - Correcta gestión de permisos entre usuarios.
4. **Compatibilidad**
   - Compatible con los navegadores más usados.
5. **Accesibilidad**
   - Cumplir con las pautas de accesibilidad web (WCAG).

## Enlaces
- **Prototipo del Proyecto**: [Figma](https://www.figma.com/design/MyadSASPShT6aJTsZiywbH/PAM?node-id=1669-162202&node-type=canvas)
- **Documentación de Endpoints**: [Swagger](https://back-pet-projectriwi-production.up.railway.app/api)
- **Tablero de Gestión del Proyecto - Frontend**: [PAM Front](https://acanorave.atlassian.net/jira/software/projects/PAM/boards/3)

## Informe de trabajo completado Frontend
![image](https://github.com/user-attachments/assets/2c482808-8ee0-4861-ac65-009f000c4a03) 

## Diagrama de flujo acumulado Frontend
![image](https://github.com/user-attachments/assets/2dc1edf6-a2d3-4bb3-ab3e-1e5be455abeb)

- **Tablero de Gestión del Proyecto - Backend**: [PAM Backend](https://acanorave.atlassian.net/jira/software/projects/PAMB/boards/4)

## Informe de trabajo completado Backend

![image](https://github.com/user-attachments/assets/f5adba6a-cacc-421f-9020-fd83e4ee8f77)

## Diagrama de flujo acumulado Backend

![image](https://github.com/user-attachments/assets/fdf8f871-ed5d-4eaa-82b8-dc8c5593546d)

