const {Router } = require('express');
const controlador = require('../controllers/newsController');
const { check } = require('express-validator');
const { validateFilds } = require('../middlewares/validators');
const { exitUser } = require('../helpers/db-validator');
const { getSocket } = require('../middlewares/sockets');
const router = Router();

router.get('/news', controlador.index );
router.get('/new/:id', controlador.show );
router.put('/new/:id' ,controlador.updateNew );
router.post('/new/', [
    check('title','El título es obligatorio').notEmpty(),
    check('body','El cuerpo de la noticia es obligatoria').notEmpty(),
    check('id_user','El autor es obligatorio').notEmpty().custom(exitUser),
    validateFilds
],controlador.createNew);
router.delete('/new/:id', controlador.destroyNew );

module.exports = router;