const {Router } = require('express');
const controlador = require('../controllers/assetsController');
const router = Router();

router.get('/assets/:id', controlador.showAssetsUser );
router.get('/asset/:id', controlador.showAsset );


module.exports = router;