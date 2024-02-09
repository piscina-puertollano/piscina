const { Router } = require('express');
const ClaseHasUsuarioController = require('../controllers/claseHasUsuarioController.js');
const router = Router();

// Asumiendo que la ruta para obtener todas las relaciones entre usuarios y clases será '/usuarios-clases'
router.get('/usuarios-clases', ClaseHasUsuarioController.obtenerClasesHasUsuarios);

// Asumiendo que la ruta para obtener una relación específica entre un usuario y una clase será '/usuarios-clases/:usuario_idusuario/:clase_idclase'
router.get('/usuarios-clases/:usuario_idusuario/:clase_idclase', ClaseHasUsuarioController.obtenerClaseHasUsuarioPorIds);

// Asumiendo que la ruta para crear una nueva relación entre un usuario y una clase será '/usuarios-clases'
router.post('/usuarios-clases', ClaseHasUsuarioController.crearClaseHasUsuario);

// Asumiendo que la ruta para actualizar una relación existente entre un usuario y una clase será '/usuarios-clases/:id'
// Nota: Aquí asumimos que el ID es el ID de la relación en sí, no el ID del usuario o la clase. Si el ID es compuesto, tendrás que ajustar la lógica de la función de controlador.
router.put('/usuarios-clases/:id', ClaseHasUsuarioController.actualizarClaseHasUsuario);

// Asumiendo que la ruta para eliminar una relación entre un usuario y una clase será '/usuarios-clases/:id'
router.delete('/usuarios-clases/:id', ClaseHasUsuarioController.eliminarClaseHasUsuario);

module.exports = router;
