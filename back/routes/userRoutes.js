const {Router } = require('express');
const controlador = require('../controllers/userController');
const router = Router();

router.post('/signup/', controlador.signup );
router.post('/login/', controlador.getUserByEmail );


module.exports = router;