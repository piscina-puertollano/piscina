/**
 * author: Marina Laguna
 */
const { Router } = require('express');
const controlador = require('../controllers/tipoController');
const router = Router();

router.get('/', controlador.tiposGet);

module.exports = router;