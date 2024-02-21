const {Router } = require('express');
const ClaseController = require('../controllers/claseController.js');
const { check } = require('express-validator');
const { validateFilds } = require('../middlewares/validators');
const router = Router();

router.get('/clases', ClaseController.obtenerClases);
router.get('/clases/:id', ClaseController.obtenerClasePorId);
router.get('/clases/categoria/:categoria', ClaseController.obtenerCategoriaPorId);
router.post('/clases', [
    check('categoria', 'La categoria debe de ser una cadena de texto').isString(),
    validateFilds
], ClaseController.crearClase);
router.put('/clases/:id', [
    check('categoria', 'La categoria debe de ser una cadena de texto').isString(),
    validateFilds
], ClaseController.actualizarClase);
router.delete('/clases/:id', ClaseController.eliminarClase);

module.exports = router;
