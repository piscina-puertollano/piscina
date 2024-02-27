/**
 * author: Marina Laguna
 */
const { Router } = require('express');
const controlador = require('../controllers/entrenamientoController');
const router = Router();

router.get('/', controlador.entrenamientosGet);

module.exports = router;