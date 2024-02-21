const {Router } = require('express');
const controlador = require('../controllers/userController');
const { check } = require('express-validator');
const { validateFilds } = require('../middlewares/validators');
const router = Router();

router.post('/login/', controlador.login );
router.get('/user/:id', controlador.showUser );
router.delete('/user/:id', controlador.deleteUser );

router.post('/user/', [
    check('firstName', 'El nombre es obligatorio').notEmpty(),
    check('lastName', 'Los apellido son obligatorios').notEmpty(),
    check('email', 'El email es obligatorio').notEmpty(),
    check('email', 'No es un email válido').isEmail(),
    check('password', 'La contraseña no puede estar vacía').notEmpty(),
    validateFilds
],controlador.newUser );


router.put('/user/', controlador.updateUser );
router.get('/users/', controlador.index);
router.post('/forget-pass/', controlador.forgetPass);
router.post('/search', controlador.getUserByValue);

//obtener los socios asociados a un tutor
router.get('/socios/:idTutor', controlador.showSociosOfTutor);

//obtener de un socio los tutores asociados
router.get('/tutor/:idSocio', controlador.showTutorsOfSocio);

router.post('/asign', controlador.asignUser)
router.post('/remove', controlador.deleteOldSocios)

module.exports = router;