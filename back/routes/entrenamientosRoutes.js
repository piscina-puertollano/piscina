const { Router } = require('express');
const controlador = require('../controllers/entrenamientoController');
const router = Router();

router.get('/listar-entrenamientos', controlador.entrenamientosGet);
router.get('/listar-entrenamiento/:id', controlador.entrenamientoGetId);
router.post('/crear-entrenamiento', controlador.entrenamientoInsert);
router.put('/actualizar-entrenamiento/:id', controlador.entrenamientoUpdate);
router.delete('/eliminar-entrenamiento/:id', controlador.entrenamientoDelete);

module.exports = router;