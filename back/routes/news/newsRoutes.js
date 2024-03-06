const {Router } = require('express');
const controlador = require('../../controllers/news/newsController');
const { check } = require('express-validator');
const { validateFilds } = require('../../middlewares/validators');
const { existUser } = require('../../helpers/db-validator');
const { getSocket } = require('../../middlewares/sockets');
const { checkToken, tokenCanRedactor } = require('../../middlewares/abilities');
const router = Router();

/**
 * @author: badr
 */

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

router.post('/counter' ,controlador.setCounts)
router.get('/fast-reed', controlador.fastReed)
router.get('/latest-news', controlador.latestNews);
router.get('/popular-news', controlador.popularNews);
router.get('/summaries', [checkToken, tokenCanRedactor],controlador.getAllSummaries);
router.get('/rand-new', controlador.randNew);
router.post('/afin-new', [
    check('categories', 'Las gategorías tiene que ser un array de categorías').isArray(),
    check('categories', `El array de categorías tiene que tener como mínimo ${process.env.MIN_SHOW_NEWS}`).isArray({min:process.env.MIN_SHOW_NEWS}),
    validateFilds
],controlador.afindFeed);

module.exports = router;