const express = require('express');
const router = express.Router();
const ClaseHasUsuarioController = require('../controllers/claseHasUsuarioController');

// Rutas para ClaseHasUsuario
router.get('/obtener/clases', ClaseHasUsuarioController.obtenerClasesHasUsuarios);
router.post('/asignar/clase/usuario', ClaseHasUsuarioController.crearClaseHasUsuario);
router.put('/actualizar/clase/usuario/:id', ClaseHasUsuarioController.actualizarClaseHasUsuario);
router.delete('/eliminar/clase/usuario/:id', ClaseHasUsuarioController.eliminarClaseHasUsuario);
module.exports = router;
