const {Router } = require('express');
const controlador = require('../controllers/eventoUsuarioController');
const router = Router();


router.post('/', controlador.eventoUsuarioInsert);


module.exports = router;