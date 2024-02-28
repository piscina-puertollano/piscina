const express = require('express');
const router = express.Router();
const ClaseController = require('../controllers/claseController.js');
const { checkToken, tokenCanTrainer } = require('../middlewares/abilities.js');

// Define the routes
router.get('/clases', [checkToken, tokenCanTrainer], ClaseController.obtenerClases);
router.get('/clases/:id', [checkToken, tokenCanTrainer], ClaseController.obtenerClasePorId);
router.get('/clases/temporada/:temporada', [checkToken, tokenCanTrainer], ClaseController.obtenerTemporadaPorId);
router.post('/clases', [checkToken, tokenCanTrainer], ClaseController.crearClase);
router.put('/clases/:id', [checkToken, tokenCanTrainer], ClaseController.actualizarClase);
router.delete('/clases/:id', [checkToken, tokenCanTrainer], ClaseController.eliminarClase);

// Export the router
module.exports = router;
