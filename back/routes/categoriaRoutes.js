const {Router } = require('express');
const controlador = require('../controllers/categoriaController');
const router = Router();


router.get('/', controlador.categoriasGet);
router.get('/:id', controlador.categoriaGet);
router.post('/', controlador.categoriaInsert);
router.put('/:id', controlador.categoriaUpdate);
router.delete('/:id', controlador.categoriaDelete);


module.exports = router;