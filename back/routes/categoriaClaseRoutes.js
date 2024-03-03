const express = require('express');
const router = express.Router();
const CategoriaClaseController = require('../controllers/categoriaClaseController.js');
const controlador = require('../controllers/userController.js');
const { checkToken, tokenCanTrainer } = require('../middlewares/abilities.js'); 

router.get('/categorias/clase', CategoriaClaseController.obtenerCategoriasClases);
router.get('/categorias/clase/:id', CategoriaClaseController.obtenerCategoriaId);
router.post('/categorias/clase', CategoriaClaseController.crearCategoria);
router.put('/categorias/clase/:id', CategoriaClaseController.actualizarCategoria);
router.delete('/categorias/clase/:id', CategoriaClaseController.eliminarCategoria);

module.exports = router;
