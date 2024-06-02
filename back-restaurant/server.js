const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware permite poner en POST el contenido del body enviado al backend
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Importar conexión mongoDB
const conectionDB = require('./conexion');

//Importamos el archivo de rutas y modelo restaurant
const rutaRestaurant = require('./rutas/restaurant')

app.use('/api/restaurant', rutaRestaurant)

//Creamos la ruta inicial del back
app.get('/', (req, res) => {
    res.end('Servidor de backend Node.js en ejecucion...');
})

//Configuramos el servidor básico
app.listen(5000, function(){
    console.log('El servidor Node Js está ejecutandose correctamente');
})
