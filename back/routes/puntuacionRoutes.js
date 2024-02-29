/**
 * @author: Marina Laguna
 */
const { Router } = require('express');
const controlador = require('../controllers/puntuacionController');
const router = Router();

router.get('/listar-puntuaciones', controlador.puntuacionesGet);
router.get('/listar-puntuacion/:id', controlador.puntuacionGetId);
router.post('/crear-puntuacion', controlador.puntuacionInsert);
router.put('/actualizar-puntuacion/:id', controlador.puntuacionUpdate);
router.delete('/eliminar-puntuacion/:id', controlador.puntuacionDelete);

module.exports = router;