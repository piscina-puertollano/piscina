// Gonzalo Martinez Haro
const {Router } = require('express');
const controlador = require('../controllers/noSocioController');
const router = Router();


router.get('/', controlador.noSociosGet);
router.get('/:id', controlador.noSocioGet);
router.post('/:idEvento', controlador.noSocioInsert);
router.put('/:id', controlador.noSocioUpdate);
router.delete('/:id', controlador.noSocioDelete);



module.exports = router;