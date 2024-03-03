const express = require('express');
const router = express.Router();
const ClaseController = require('../controllers/claseController.js');
const { checkToken, tokenCanTrainer, tokenCanAdmin } = require('../middlewares/abilities.js');

// Define the routes
router.get('/clases', [checkToken, tokenCanAdmin], ClaseController.obtenerClases);
router.get('/clases/:id', [checkToken, tokenCanAdmin], ClaseController.obtenerClasePorId);
router.get('/clases/temporada/:temporada', [checkToken, tokenCanAdmin], ClaseController.obtenerTemporadaPorId);
router.post('/clases', [checkToken, tokenCanAdmin], ClaseController.crearClase);
router.put('/clases/:id', [checkToken, tokenCanAdmin], ClaseController.actualizarClase);
router.delete('/clases/:id', [checkToken, tokenCanAdmin], ClaseController.eliminarClase);

// Export the router
module.exports = router;
