const { Router } = require('express');

const { validateFile } = require('../middlewares/check-files');
const controller = require('../controllers/uploadsController');
const { checkToken } = require('../middlewares/abilities');

/**
 * @author: badr
 */

const router = Router();


router.post( '/', [validateFile], controller.uploadFile);
router.post('/:id', controller.showFile)
router.put('/:id', [checkToken],controller.actualizarImagen)
router.delete('/:id/:folder', [checkToken],controller.destroyFile)

module.exports = router;