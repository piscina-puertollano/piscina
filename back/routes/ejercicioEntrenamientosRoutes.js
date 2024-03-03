/**
 * @author Marina Laguna
 */
const { Router } = require('express');
const controlador = require('../controllers/ejercicioEntrenamientoController');
const { checkToken, tokenCanTrainer } = require('../middlewares/abilities');
const router = Router();

router.get('/', [checkToken, tokenCanTrainer], controlador.entrenamientosGet);
router.get('/:id', [checkToken, tokenCanTrainer], controlador.entrenamientoGetId);
router.post('/crear-entrenamiento', [checkToken, tokenCanTrainer], controlador.entrenamientoInsert);
router.put('/:id', [checkToken, tokenCanTrainer], controlador.entrenamientoUpdate);
router.delete('/:id', [checkToken, tokenCanTrainer], controlador.entrenamientoDelete);

module.exports = router;