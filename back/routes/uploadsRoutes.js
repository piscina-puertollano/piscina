const { Router } = require('express');

const { validateFile } = require('../middlewares/check-files');
const controller = require('../controllers/uploadsController');


const router = Router();


router.post( '/', validateFile, controller.cargarArchivo);
router.get('/:id', controller.obtenerImagen)
router.put('/:id', controller.actualizarImagen)
router.delete('/:id', controller.borrarImagen)

module.exports = router;