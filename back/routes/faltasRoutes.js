const express = require('express');
const router = express.Router();
const FaltasController = require('../controllers/faltasController.js');
const controlador = require('../controllers/userController.js');
const { checkToken, tokenCanTrainer } = require('../middlewares/abilities.js'); 

router.get('/faltas', FaltasController.obtenerFaltas);
router.get('/faltas/:id', FaltasController.obtenerFaltaPorId);
router.post('/faltas', FaltasController.crearFalta);
router.put('/faltas/:id', FaltasController.actualizarFalta);
router.delete('/faltas/:id', FaltasController.eliminarFalta);


router.get('/obtener/usuarios/', [checkToken, tokenCanTrainer], controlador.index);

module.exports = router;
