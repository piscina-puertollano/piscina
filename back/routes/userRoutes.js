const {Router } = require('express');
const controlador = require('../controllers/userController');
const router = Router();

router.post('/login/', controlador.getUserByEmail );
router.get('/user/', controlador.getUserByEmail );
router.post('/user/', controlador.newUser );
router.put('/user/', controlador.updateUser );
router.get('/users/', controlador.index);
router.post('/forget-pass/', controlador.forgetPass);


module.exports = router;