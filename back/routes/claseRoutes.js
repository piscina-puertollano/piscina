const express = require('express');
const router = express.Router();
const claseController = require('../controllers/claseController');

// Ruta para obtener todas las clases
router.get('/', claseController.obtenerClases);

// Ruta para obtener una clase por su ID
router.get('/:id', claseController.obtenerClasePorId);

// Ruta para crear una nueva clase
router.post('/', claseController.crearClase);

// Ruta para actualizar una clase por su ID
router.put('/:id', claseController.actualizarClase);

// Ruta para eliminar una clase por su ID
router.delete('/:id', claseController.eliminarClase);

module.exports = router;
