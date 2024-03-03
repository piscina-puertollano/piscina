/**
 * @author Marina Laguna
 */
const { Router } = require('express');
const controlador = require('../controllers/tipoController');
const { checkToken, tokenCanTrainer } = require('../middlewares/abilities');
const router = Router();

router.get('/', [checkToken, tokenCanTrainer], controlador.tiposGet);

module.exports = router;