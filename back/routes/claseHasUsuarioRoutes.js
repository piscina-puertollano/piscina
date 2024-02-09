const { Router } = require('express');
const ClaseHasUsuarioController = require('../controllers/claseHasUsuarioController.js');
const router = Router();

router.get('/usuarios-clases', ClaseHasUsuarioController.obtenerClasesHasUsuarios);

// Asumiendo que la ruta para obtener una relación específica entre un usuario y una clase será '/usuarios-clases/:usuario_idusuario/:clase_idclase'
router.get('/usuarios-clases/:usuario_idusuario/:clase_idclase', ClaseHasUsuarioController.obtenerClaseHasUsuarioPorIds);
router.post('/usuarios-clases', ClaseHasUsuarioController.crearClaseHasUsuario);
router.put('/usuarios-clases/:id', ClaseHasUsuarioController.actualizarClaseHasUsuario);
router.delete('/usuarios-clases/:id', ClaseHasUsuarioController.eliminarClaseHasUsuario);

module.exports = router;
