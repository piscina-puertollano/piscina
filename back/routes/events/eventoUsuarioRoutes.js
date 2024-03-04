// Gonzalo Martinez Haro
const {Router } = require('express');
const controlador = require('../../controllers/events/eventoUsuarioController');
const router = Router();


router.post('/', controlador.eventoUsuarioInsert);


module.exports = router;