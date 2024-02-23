const express = require('express');
const router = express.Router();
const ClaseController = require('../controllers/claseHasUsuarioController.js');

router.get('/obtener/clases', ClaseController.obtenerClases);
router.get('/obtener/clases/:id', ClaseController.obtenerClasePorId);
router.post('/asignar/clase', ClaseController.crearClase);
router.put('/clases/:id', ClaseController.actualizarClase);
router.delete('/eliminar/usuario/:id', ClaseController.eliminarClase);

module.exports = router;