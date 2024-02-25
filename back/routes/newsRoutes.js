const {Router } = require('express');
const controlador = require('../controllers/newsController');
const { check } = require('express-validator');
const { validateFilds } = require('../middlewares/validators');
const { existUser } = require('../helpers/db-validator');
const { getSocket } = require('../middlewares/sockets');
const { checkToken, tokenCanRedactor } = require('../middlewares/abilities');
const router = Router();

router.get('/news', controlador.index );
router.get('/new/:id', controlador.show );
router.put('/new/:id',[ checkToken, tokenCanRedactor] ,controlador.updateNew );
router.post('/new/', [
    checkToken,
    tokenCanRedactor,
    check('title','El título es obligatorio').notEmpty(),
    check('body','El cuerpo de la noticia es obligatoria').notEmpty(),
    validateFilds
],controlador.createNew);

router.delete('/new/:id',[checkToken, tokenCanRedactor], controlador.destroyNew );

module.exports = router;