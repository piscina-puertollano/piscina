const { Router } = require('express');
const ClaseHasUsuarioController = require('../controllers/claseHasUsuarioController.js');
const router = Router();
const { check } = require('express-validator');
const { validateFilds } = require('../middlewares/validators');

router.get('/usuarios-clases', ClaseHasUsuarioController.obtenerClasesHasUsuarios);

// Asumiendo que la ruta para obtener una relación específica entre un usuario y una clase será '/usuarios-clases/:usuario_idusuario/:clase_idclase'
router.get('/usuarios-clases/:usuario_idusuario/:clase_idclase', ClaseHasUsuarioController.obtenerClaseHasUsuarioPorIds);
router.post('/usuarios-clases',  [
    check('id_usuario', 'El id del usuario debe de ser un número entero').isInt(),
    check('id_clase', 'El id de la clase debe de ser un número entero').isInt(),
    validateFilds
], ClaseHasUsuarioController.crearClaseHasUsuario);
router.put('/usuarios-clases/:id', ClaseHasUsuarioController.actualizarClaseHasUsuario);
router.delete('/usuarios-clases/:id', ClaseHasUsuarioController.eliminarClaseHasUsuario);

module.exports = router;
