const express = require('express');
const router = express.Router();
const ClaseController = require('../controllers/claseHasUsuarioController.js');

router.get('/clases', ClaseController.obtenerClases);
router.get('/clases/:id', ClaseController.obtenerClasePorId);
router.post('/clases', ClaseController.crearClase);
router.put('/clases/:id', ClaseController.actualizarClase);
router.delete('/clases/:id', ClaseController.eliminarClase);

module.exports = router;