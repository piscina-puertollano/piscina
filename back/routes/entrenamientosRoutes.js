/**
 * @author Marina Laguna
 */
const { Router } = require('express');
const controlador = require('../controllers/entrenamientoController');
const { checkToken, tokenCanTrainer } = require('../middlewares/abilities');
const router = Router();

router.get('/', [checkToken, tokenCanTrainer], controlador.entrenamientosGet);

module.exports = router;