// Gonzalo Martinez Haro
const {Router } = require('express');
const controlador = require('../../controllers/events/eventoController');
const router = Router();
const {validarCampos} = require("../../middlewares/validarCampos");
const {check} = require('express-validator')
const { statusUser, tokenCanAdmin, tokenCanUserAuth, checkToken, tokenCanRedactor, tokenCanTutor, tokenCanSocio } = require('../../middlewares/abilities');



router.route('/')
    .get([checkToken, tokenCanAdmin,tokenCanTutor],controlador.eventosGet)
    .post([[checkToken, tokenCanAdmin],
        check('nombre','El nombre es obligatorio.').not().isEmpty(),
        check('fecha', 'la fecha es obligatoria').not().isEmpty(),
        check('sede','La sede es obligatoria').not().isEmpty(),
        check('categoria','La categoria es obligatoria').not().isEmpty(),
        validarCampos
    ], controlador.eventoInsert)

//Se pone antes de getEventos parque si eventos/visibles se define primero,
//Express la reconocerá como una ruta específica y no intentará tratar "visibles" como un parámetro para la ruta /:id.
router.get('/visibles', controlador.eventosVisiblesGet);

router.get('/:id', controlador.eventoGet);
router.put('/:id',[checkToken, tokenCanAdmin], controlador.eventoUpdate);
router.delete('/:id',[checkToken, tokenCanAdmin], controlador.eventoDelete);





module.exports = router;