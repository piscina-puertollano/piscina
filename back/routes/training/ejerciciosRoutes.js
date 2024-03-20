/**
 * @author Marina Laguna
 */
const { Router } = require('express');
const controlador = require('../../controllers/training/ejercicioController');
const { checkToken, tokenCanTrainer } = require('../../middlewares/abilities');
const router = Router();

router.get('/', [checkToken, tokenCanTrainer], controlador.ejercicioGet);
router.get('/:id', [checkToken, tokenCanTrainer], controlador.ejercicioGetId);
router.post('/crear-ejercicios', [checkToken, tokenCanTrainer], controlador.ejercicioInsert);
router.put('/:id', [checkToken, tokenCanTrainer], controlador.ejercicioUpdate);
router.delete('/:id', [checkToken, tokenCanTrainer], controlador.ejercicioDelete);

module.exports = router;