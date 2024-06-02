const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const eschema = mongoose.Schema

const eschemaRestaurant = new eschema({
    address: {
        building: String,
        coord: [Number],
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
    if (!req.body.address || !req.body.borough || !req.body.cuisine || !req.body.name || !req.body.restaurant_id) {
        return res.status(400).send('Todos los campos son requeridos');
    } else{
        const nuevoRestaurante = new ModelRestaurant({
            address: {
                building: req.body.address.building,
                coord: req.body.address.coord,
                street: req.body.address.street,
                zipcode: req.body.address.zipcode
            },
            borough: req.body.borough,
            cuisine: req.body.cuisine,
            grades: req.body.grades || [],
            comments: req.body.comments || [],
            name: req.body.name,
            restaurant_id: req.body.restaurant_id
        });
    
        try {
            const savedRestaurant = await nuevoRestaurante.save();
            if(!savedRestaurant){
                return res.status(404).send('Restaurante no agregado');
            }else{
                res.send('Restaurante agregado correctamente');
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }
});

// Leer todos los restaurantes OK
router.get('/', async (req, res) => {
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
        const updatedData = {
            address: req.body.address,
            borough: req.body.borough,
            cuisine: req.body.cuisine,
            grades: req.body.grades,
            comments: req.body.comments,
            name: req.body.name,
            restaurant_id: req.body.restaurant_id
        };
        const updatedRestaurant = await ModelRestaurant.findByIdAndUpdate(restaurantId, updatedData, { new: true });
        if (!updatedRestaurant) {
            return res.status(404).send('Restaurante no encontrado');
        } else{
            res.send('Restaurante actualizado correctamente');
        }
    } catch (err) {
        res.status(500).send(err);
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
