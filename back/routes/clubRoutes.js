const {Router } = require('express');
const controlador = require('../controllers/clubController');
const router = Router();

router.get('/club', controlador.showClub );

module.exports = router;
