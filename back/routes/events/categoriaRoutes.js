// Gonzalo Martinez Haro
const {Router } = require('express');
const controlador = require('../../controllers/events/categoriaController');
const router = Router();
const {validarCampos} = require("../../middlewares/validarCampos");
const {check} = require('express-validator')




router.route('/')
    .get(controlador.categoriasGet)
    .post([
        check('nombre','El nombre es obligatorio.').not().isEmpty(),
        validarCampos
    ], controlador.categoriaInsert)


router.get('/:id', controlador.categoriaGet);
router.post('/', controlador.categoriaInsert);
router.put('/:id', controlador.categoriaUpdate);
router.delete('/:id', controlador.categoriaDelete);


module.exports = router;