const {Router } = require('express');
const FaltasController = require('../controllers/faltasController.js');
const { check } = require('express-validator');
const { validateFilds } = require('../middlewares/validators');
const router = Router();


router.get('/faltas', FaltasController.obtenerFaltas);
router.get('/faltas/:id', FaltasController.obtenerFaltaPorId);
router.post('/faltas',
[
    check('id_usuario', 'El id del usuario debe de ser un número entero').isInt(),
    check('id_clase', 'El id de la clase debe de ser un número entero').isInt(),
    validateFilds
], 
FaltasController.crearFalta);
router.put('/faltas/:id', FaltasController.actualizarFalta);
router.delete('/faltas/:id', FaltasController.eliminarFalta);

module.exports = router;
