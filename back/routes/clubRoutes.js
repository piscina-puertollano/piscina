const {Router } = require('express');
const controlador = require('../controllers/clubController');
const { check } = require('express-validator');
const { validateFilds } = require('../middlewares/validators');
const { checkToken, tokenCanWebmaster } = require('../middlewares/abilities');
const router = Router();

router.get('/club',controlador.index );

router.post('/show',[
    checkToken,
    tokenCanWebmaster,
    check('tag','El tag es obligatorio y no puede estár vacío').notEmpty(),
    validateFilds
]
, controlador.showClub );

router.put('/club/:id', [
    checkToken,
    tokenCanWebmaster
] ,controlador.updateClub );

module.exports = router;
