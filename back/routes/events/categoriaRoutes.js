// Gonzalo Martinez Haro
const {Router } = require('express');
const controlador = require('../../controllers/events/categoriaController');
const router = Router();
const {validarCampos} = require("../../middlewares/validarCampos");
const {check} = require('express-validator')
const { statusUser, tokenCanAdmin, tokenCanUserAuth, checkToken, tokenCanRedactor, tokenCanTutor, tokenCanSocio } = require('../../middlewares/abilities');




router.route('/')
    .get(controlador.categoriasGet)
    .post([checkToken, tokenCanAdmin],[
        check('nombre','El nombre es obligatorio.').not().isEmpty(),
        validarCampos
    ], controlador.categoriaInsert)


router.get('/:id', controlador.categoriaGet);
router.put('/:id',[checkToken, tokenCanAdmin], controlador.categoriaUpdate);
router.delete('/:id',[checkToken, tokenCanAdmin], controlador.categoriaDelete);


module.exports = router;