/**
 * @author Marina Laguna
 */
const { Router } = require('express');
const controlador = require('../../controllers/training/ejercicioEntrenamientoController');
const { checkToken, tokenCanTrainer, tokenCanTutorOrSocio } = require('../../middlewares/abilities');
const router = Router();

router.get('/', [checkToken, tokenCanTrainer], controlador.entrenamientosGet);
router.get('/:id', [checkToken, tokenCanTrainer], controlador.entrenamientoGetId);
router.post('/crear-entrenamiento', [checkToken, tokenCanTrainer], controlador.entrenamientoInsert);
router.put('/:id', [checkToken, tokenCanTrainer], controlador.entrenamientoUpdate);
router.delete('/:id', [checkToken, tokenCanTrainer], controlador.entrenamientoDelete);

router.get('/asignado/:id', [checkToken, tokenCanTutorOrSocio], controlador.entrenamientoGetId);

module.exports = router;