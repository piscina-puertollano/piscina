const { Router } = require('express');

const { validateFile } = require('../middlewares/check-files');
const controller = require('../controllers/uploadsController');


const router = Router();


router.post( '/', validateFile, controller.uploadFile);
router.post('/:id', controller.showFile)
router.put('/:id', controller.actualizarImagen)
router.delete('/:id/:folder', controller.destroyFile)

module.exports = router;