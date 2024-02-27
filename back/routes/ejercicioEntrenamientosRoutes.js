/**
 * author: Marina Laguna
 */
const { Router } = require('express');
const controlador = require('../controllers/ejercicioEntrenamientoController');
const router = Router();

router.get('/', controlador.entrenamientosGet);
router.get('/:id', controlador.entrenamientoGetId);
router.post('/crear-entrenamiento', controlador.entrenamientoInsert);
router.put('/:id', controlador.entrenamientoUpdate);
router.delete('/:id', controlador.entrenamientoDelete);

module.exports = router;