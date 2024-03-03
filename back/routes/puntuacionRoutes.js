/**
 * @author Marina Laguna
 */
const { Router } = require('express');
const controlador = require('../controllers/puntuacionController');
const { checkToken, tokenCanTrainer } = require('../middlewares/abilities');
const router = Router();

router.get('/', [checkToken, tokenCanTrainer], controlador.puntuacionesGet);
router.get('/socios', [checkToken, tokenCanTrainer], controlador.sociosGet);
router.post('/crear-puntuacion', [checkToken, tokenCanTrainer], controlador.puntuacionInsert);
router.put('/:id', [checkToken, tokenCanTrainer], controlador.puntuacionUpdate);
router.delete('/:id', [checkToken, tokenCanTrainer], controlador.puntuacionDelete);

//ruta para obtener los usuarios que son socios
//para calificarlos y poder asignarles entrenamientos
router.get('/:id', [checkToken, tokenCanTrainer], controlador.puntuacionGetId);

module.exports = router;