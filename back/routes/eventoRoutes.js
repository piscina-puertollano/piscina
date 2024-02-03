const {Router } = require('express');
const controlador = require('../controllers/eventoController');
const router = Router();


router.get('/', controlador.eventosGet);
router.get('/:id', controlador.eventoGet);
router.post('/', controlador.eventoInsert);
router.put('/:id', controlador.eventoUpdate);
router.delete('/:id', controlador.eventoDelete);



module.exports = router;