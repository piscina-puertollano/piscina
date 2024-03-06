/**
 * @author Marina Laguna
 */
const { Router } = require('express');
const controlador = require('../../controllers/training/puntuacionController');
const { checkToken, tokenCanTrainer, tokenCanTutorOrSocio } = require('../../middlewares/abilities');
const router = Router();

//--------------RUTAS PARA EL ENTRENADOR
router.get('/', [checkToken, tokenCanTrainer], controlador.puntuacionesGet);
router.get('/socios', [checkToken, tokenCanTrainer], controlador.sociosGet);
router.post('/crear-puntuacion', [checkToken, tokenCanTrainer], controlador.puntuacionInsert);
router.put('/:id', [checkToken, tokenCanTrainer], controlador.puntuacionUpdate);
router.delete('/:id', [checkToken, tokenCanTrainer], controlador.puntuacionDelete);
router.get('/socio/:socioId', [checkToken, tokenCanTrainer], controlador.puntuacionGetSocioId);

//ruta para obtener los usuarios que son socios
//para calificarlos y poder asignarles entrenamientos
router.get('/:id', [checkToken, tokenCanTrainer], controlador.puntuacionGetId);

//---------------RUTAS PARA SOCIO O TUTOR
router.get('/notas/:socioId', [checkToken, tokenCanTutorOrSocio], controlador.puntuacionGetSocioId);
router.get('/tutor-users/:userId', controlador.getTutorUsers);

module.exports = router;