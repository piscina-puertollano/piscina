/**
 * @author: Marina Laguna
 */
const { Router } = require('express');
const controlador = require('../controllers/puntuacionController');
const router = Router();

router.get('/', controlador.puntuacionesGet);
router.get('/:id', controlador.puntuacionGetId);
router.post('/crear-puntuacion', controlador.puntuacionInsert);
router.put('/:id', controlador.puntuacionUpdate);
router.delete('/:id', controlador.puntuacionDelete);

module.exports = router;