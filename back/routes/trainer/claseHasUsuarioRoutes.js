//Manuel Garcia

const express = require('express');
const router = express.Router();
const ClaseHasUsuarioController = require('../../controllers/trainer/claseHasUsuarioController');
const { checkToken, tokenCanTrainer, tokenCanAdmin } = require('../../middlewares/abilities.js');


router.get('/obtener/clases', ClaseHasUsuarioController.obtenerClasesHasUsuarios);
router.post('/asignar/clase/usuario', [checkToken, tokenCanAdmin], ClaseHasUsuarioController.crearClaseHasUsuario);
router.put('/actualizar/clase/usuario/:id', [checkToken, tokenCanAdmin], ClaseHasUsuarioController.actualizarClaseHasUsuario);
router.delete('/eliminar/clase/usuario/:id', [checkToken, tokenCanAdmin], ClaseHasUsuarioController.eliminarClaseHasUsuario);
module.exports = router;
