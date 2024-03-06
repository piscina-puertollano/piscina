// Gonzalo Martinez Haro
const {Router } = require('express');
const controlador = require('../../controllers/events/noSocioController');
const router = Router();
const {check} = require('express-validator')
const { statusUser, tokenCanAdmin, tokenCanUserAuth, checkToken, tokenCanRedactor, tokenCanTutor, tokenCanSocio } = require('../../middlewares/abilities');


router.get('/participantes/:id', controlador.getNoSocioConIdEvento);
router.get('/', controlador.noSociosGet);
router.get('/:id', controlador.noSocioGet);
router.post('/:idEvento', controlador.noSocioInsert);
router.put('/:id',[checkToken, tokenCanAdmin], controlador.noSocioUpdate);
router.delete('/:id',[checkToken, tokenCanAdmin], controlador.noSocioDelete);





module.exports = router;