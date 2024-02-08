const express = require('express');
const router = express.Router();
const ClaseController = require('../controllers/claseController.js');

// Define the routes
router.get('/clases', ClaseController.obtenerClases);
router.get('/clases/:id', ClaseController.obtenerClasePorId);
router.get('/clases/temporada/:temporada', ClaseController.obtenerTemporadaPorId);
router.post('/clases', ClaseController.crearClase);
router.put('/clases/:id', ClaseController.actualizarClase);
router.delete('/clases/:id', ClaseController.eliminarClase);

// Export the router
module.exports = router;
