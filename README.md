# Reto6_FullStackCore-Digital-Nao
Bases de datos no relacionales para almacenar datos en JSON

## Backup de la Base de Datos MongoDB

Este repositorio contiene un backup de la base de datos, colecciones, datos importados de CSV e índices.

## Endpoints

### Agregar un nuevo restaurante
- **POST**: `/api/restaurant/`
- **Descripción**: Permite agregar un nuevo restaurante a la base de datos.

### Listar todos los restaurantes
- **GET**: `/api/restaurant/`
- **Descripción**: Permite listar todos los restaurantes de la base de datos.

### Leer un restaurante por ID
- **GET**: `/api/restaurant/:id`
- **Descripción**: Permite obtener información de un restaurant específico de la base de datos.

### Actualizar un restaurante por ID
- **PUT**: `/api/restaurant/:id`
- **Descripción**: Permite actualizar la información de un restaurante específico mediante su ID.

### Eliminar un restaurante por ID
- **DELETE**: `/api/restaurant/:id`
- **Descripción**: Permite eliminar un restaurante específico de la base de datos mediante su ID.

### Agregar un comentario a un restaurante
- **POST**: `/api/restaurant/:id/comments`
- **Descripción**: Permite agregar un comentario a un restaurante específico mediante su ID.

### Calificar un restaurante
- **POST**: `/api/restaurant/:id/grades`
- **Descripción**: Permite agregar una calificación (score) a un restaurante específico mediante su ID.

## Requisitos

- MongoDB instalado
- Instalar Express:
  ```bash
  npm install express
- Instalar Nodemon:
  ```bash
  npm install nodemon
- Instalar Mongoose:
  ```bash
  npm install mongoose
