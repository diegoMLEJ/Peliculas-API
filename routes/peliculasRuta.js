// Rutas para producto
const express = require('express');
const router = express.Router();
const peliculaController = require('../controller/peliculaController');

// api/productos
router.post('/', peliculaController.insertarPelicula);
router.get('/', peliculaController.obtenerPeliculas);
router.put('/:id', peliculaController.actualizarPelicula);
router.get('/:id', peliculaController.obtenerPelicula);
router.delete('/:id', peliculaController.eliminarPelicula);

module.exports = router;