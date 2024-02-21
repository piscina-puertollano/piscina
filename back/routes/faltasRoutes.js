const express = require('express');
const router = express.Router();
const FaltasController = require('../controllers/faltasController.js');

router.get('/faltas', FaltasController.obtenerFaltas);
router.get('/faltas/:id', FaltasController.obtenerFaltaPorId);
router.post('/faltas', FaltasController.crearFalta);
router.put('/faltas/:id', FaltasController.actualizarFalta);
router.delete('/faltas/:id', FaltasController.eliminarFalta);

module.exports = router;
