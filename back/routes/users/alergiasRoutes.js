const {Router } = require('express');
const controlador = require('../../controllers/users/alergiasController');
const { check } = require('express-validator');
const { validateFilds } = require('../../middlewares/validators');
const { checkToken, tokenCanRedactor, tokenCanTutorOrSocio } = require('../../middlewares/abilities');
const router = Router();

/**
 * @author: badr
 */


router.get('/my-alergias/',[checkToken, tokenCanTutorOrSocio], controlador.showAlergiasOfUser );
router.get('/alergias', controlador.index);
router.get('/alergias/:id_user', controlador.showAlergiasOfUser );

router.post('/alergia/', [checkToken, tokenCanTutorOrSocio,
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('description', 'La descripcion es obligatoria').notEmpty(),
    validateFilds
], controlador.createAlergia);

router.put('/alergia/:id', [checkToken, tokenCanTutorOrSocio], controlador.updateAlergia);
router.delete('/alergia/:id',[checkToken, tokenCanTutorOrSocio], controlador.destroyAlergia );



//----------------Alergias_user----------------------------

router.post('/alergia-user', [checkToken, tokenCanTutorOrSocio], controlador.saveOrUpdateAlergiasOfUser)

module.exports = router;