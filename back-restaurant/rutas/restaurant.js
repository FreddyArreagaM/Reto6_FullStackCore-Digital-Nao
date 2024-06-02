const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const eschema = mongoose.Schema

const eschemaRestaurant = new eschema({
    address: {
        building: String,
        coord: {
            type: [Number],
            index: '2dsphere'
        },
        street: String,
        zipcode: String
    },
    borough: String,
    cuisine: String,
    grades: [
        {
            date: Date,
            score: Number
        }
    ],
    comments: [
        {
            date: Date,
            comment: String
        }
    ],
    name: String,
    restaurant_id: String
})

const ModelRestaurant = mongoose.model('restaurant', eschemaRestaurant)
module.exports = router

//Endpoint de prueba test OK
router.get('/test', (req, res) => {
    res.end('Test de prueba backend')
})

//Crear un nuevo restaurant OK
router.post('/', async (req, res) => {
    console.log(req.body); // Agrega esto para verificar el cuerpo de la solicitud
    const { address, borough, cuisine, name, grades, comments } = req.body;

    // Verificar que todos los campos requeridos están presentes
    if (!address || !borough || !cuisine || !name) {
        return res.status(400).send('Todos los campos son requeridos');
    }

    // Verificar que las coordenadas sean un array de dos números
    if (!Array.isArray(address.coord) || address.coord.length !== 2 || 
        typeof address.coord[0] !== 'number' || typeof address.coord[1] !== 'number') {
        return res.status(400).send('Las coordenadas deben ser un array de dos números [longitude, latitude]');
    }

    // Crear el nuevo restaurante
    const nuevoRestaurante = new ModelRestaurant({
        address: {
            building: address.building,
            coord: address.coord,
            street: address.street,
            zipcode: address.zipcode
        },
        borough: borough,
        cuisine: cuisine,
        grades: grades || [],
        comments: comments || [],
        name: name
    });

    try {
        const savedRestaurant = await nuevoRestaurante.save();
        if (!savedRestaurant) {
            return res.status(404).send('Restaurante no agregado');
        } else {
            res.send('Restaurante agregado correctamente');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Leer todos los restaurantes OK
router.get('/restaurants', async (req, res) => {
    try {
        const docs = await ModelRestaurant.find({}).exec();
        res.send(docs);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Leer un restaurante por ID OK
router.get('/:id', async (req, res) => {
    try {
        const restaurant = await ModelRestaurant.findById(req.params.id);
        res.json(restaurant);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Actualizar un restaurante por ID OK
router.put('/:id', async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const {
            address,
            borough,
            cuisine,
            grades,
            comments,
            name,
        } = req.body;

        // Verificar que los campos requeridos están presentes
        if (!address || !borough || !cuisine || !name) {
            return res.status(400).send('Todos los campos son requeridos');
        }

        // Verificar que las coordenadas sean un array de dos números
        if (!Array.isArray(address.coord) || address.coord.length !== 2 || 
            typeof address.coord[0] !== 'number' || typeof address.coord[1] !== 'number') {
            return res.status(400).send('Las coordenadas deben ser un array de dos números [longitude, latitude]');
        }

        // Preparar los datos actualizados
        const updatedData = {
            address: {
                building: address.building,
                coord: address.coord,
                street: address.street,
                zipcode: address.zipcode
            },
            borough: borough,
            cuisine: cuisine,
            grades: grades || [],
            comments: comments || [],
            name: name,
        };

        // Actualizar el restaurante
        const updatedRestaurant = await ModelRestaurant.findByIdAndUpdate(restaurantId, updatedData, { new: true });

        if (!updatedRestaurant) {
            return res.status(404).send('Restaurante no encontrado');
        } else {
            res.send('Restaurante actualizado correctamente');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// Eliminar un restaurante por ID OK
router.delete('/:id', async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const deletedRestaurant = await ModelRestaurant.findByIdAndDelete(restaurantId);
        if (!deletedRestaurant) {
            return res.status(404).send('Restaurante no encontrado');
        }else{
            res.send('Restaurante eliminado correctamente');
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


// Agregar un comentario a un restaurante OK
router.post('/:id/comments', async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const newComment = {
            date: new Date(),
            comment: req.body.comment,
            _id: new mongoose.Types.ObjectId()
        };

        const updatedRestaurant = await ModelRestaurant.findByIdAndUpdate(
            restaurantId,
            { $push: { comments: newComment } },
            { new: true }
        );

        if (!updatedRestaurant) {
            return res.status(404).send('Restaurante no encontrado');
        }

        res.send('Comentario agregado correctamente');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Calificar un restaurante OK
router.post('/:id/grades', async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const newRating = {
            date: new Date(),
            score: req.body.score
        };

        const updatedRestaurant = await ModelRestaurant.findByIdAndUpdate(
            restaurantId,
            { $push: { grades: newRating } },
            { new: true }
        );

        if (!updatedRestaurant) {
            return res.status(404).send('Restaurante no encontrado');
        }

        res.send('Calificación agregada correctamente');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Lista los restaurantes según se filtre por medio de su nombre, tipo de comida, ciudad, calle o codigo postal. 
router.get('/', async (req, res) => {
    try {
        const { search, longitude, latitude } = req.query;

        if (!longitude || !latitude) {
            return res.status(400).json({ error: "Los parámetros 'longitude' y 'latitude' son requeridos" });
        }

        // Crear el filtro usando el parámetro de búsqueda
        let filter = {};
        if (search) {
            filter = {
                $or: [
                    { name: { $regex: new RegExp(search, 'i') } },
                    { cuisine: { $regex: new RegExp(search, 'i') } },
                    { borough: { $regex: new RegExp(search, 'i') } },
                    { 'address.street': { $regex: new RegExp(search, 'i') } },
                    { 'address.zipcode': { $regex: new RegExp(search, 'i') } }
                ]
            };
        }

        // Ejecutar la consulta geoespacial
        const restaurants = await ModelRestaurant.find(filter)
            .near('address.coord', {
                center: [parseFloat(longitude), parseFloat(latitude)],
                spherical: true
            });

        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



  
  