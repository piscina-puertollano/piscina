const { Route } = require('express');
const controlador = require('../controllers/entrenamientoController');
const router = Router();

router.get('/', controlador.entrenamientosGet);
router.get('/:id', controlador.entrenamientoGetId);
router.post('/', controlador.entrenamientoInsert);
router.put('/:id', controlador.entrenamientoUpdate);
router.delete('/:id', controlador.entrenamientoDelete);

module.exports = router;