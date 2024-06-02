# Reto6_FullStackCore-Digital-Nao
Desarrollo de la API REST, vinculando la base de datos en MongoDB con el framework Express.js usando
MongoDB Client esto implicaría una innovación y lo que le dará el valor agregado a Tattler.

## Backup de la Base de Datos MongoDB

Este repositorio contiene un backup de la base de datos, colecciones, datos importados de CSV e índices.

### Stack utilizado 

###

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" height="40" alt="mongodb logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" height="40" alt="npm logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="40" alt="express logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" height="40" alt="vscode logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height="40" alt="git logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=github" height="40" alt="github logo"  />
  <img width="12" />
</div>


## Endpoints

### Agregar un nuevo restaurante
- **POST**: `/api/restaurant/`
- **Descripción**: Permite agregar un nuevo restaurante a la base de datos.

### Listar todos los restaurantes
- **GET**: `/api/restaurant/restaurants`
- **Descripción**: Permite listar todos los restaurantes de la base de datos.

### Leer un restaurante por ID
- **GET**: `/api/restaurant/:id`
- **Descripción**: Permite obtener información de un restaurante específico de la base de datos.

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

### Filtrar restaurante por nombre, ciudad y ordenado del más cercano al más lejos.
- **GET**: `/api/restaurant/`
- **Descripción**: Permite obtener restaurantes según se filtre por medio de su nombre, tipo de comida, ciudad, calle o codigo postal. Y ordenado del más cercano al más lejos. 
  
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
