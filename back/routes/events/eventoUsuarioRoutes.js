// Gonzalo Martinez Haro
const {Router } = require('express');
const controlador = require('../../controllers/events/eventoUsuarioController');
const router = Router();
const { statusUser, tokenCanAdmin, tokenCanUserAuth, checkToken, tokenCanRedactor, tokenCanTutor, tokenCanSocio } = require('../../middlewares/abilities');


router.post('/',[checkToken, tokenCanTutor,tokenCanAdmin], controlador.eventoUsuarioInsert);
router.get('/',controlador.eventosUsuariosGets);
router.get('/:id',[checkToken, tokenCanTutor], controlador.getUsuarioConIdEvento)


module.exports = router;