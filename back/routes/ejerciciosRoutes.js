/**
 * @author: Marina Laguna
 */
const { Router } = require('express');
const controlador = require('../controllers/ejercicioController');
const router = Router();

router.get('/listar-ejercicios', controlador.ejercicioGet);
router.get('/listar-ejercicios/:id', controlador.ejercicioGetId);
router.post('/crear-ejercicios', controlador.ejercicioInsert);
router.put('/actualizar-ejercicios/:id', controlador.ejercicioUpdate);
router.delete('/eliminar-ejercicios/:id', controlador.ejercicioDelete);

module.exports = router;