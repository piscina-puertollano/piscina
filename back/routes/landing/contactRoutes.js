const {Router } = require('express');
const controlador = require('../../controllers/news/commentsController');
const { check } = require('express-validator');
const { validateFilds } = require('../../middlewares/validators');
const { checkToken, tokenCanRedactor } = require('../../middlewares/abilities');
const router = Router();

/**
 * @author: badr
 */


router.get('/comments/:id_new', controlador.index );
router.post('/comments/', [checkToken, tokenCanRedactor], controlador.createComment);

router.delete('/comments/:id_new',[checkToken, tokenCanRedactor], controlador.destroyComment );

module.exports = router;