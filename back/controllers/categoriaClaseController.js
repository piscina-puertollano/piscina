/* Manuel Garcia */
const express = require('express');
const CategoriaClaseConnection = require('../database/categoriaClasesConnection');
const claseConnection = new CategoriaClaseConnection();
const obtenerCategoriasClases = async (req, res = express.response) => {
    try {
        const categorias = await claseConnection.getCategorias();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las categorias', error: error });
    }
};

const obtenerCategoriaId = async (req, res = express.response) => {
    const { id } = req.params;
    try {
        const categoria = await claseConnection.getCategoria(id);
        if (categoria) {
            res.status(200).json(categoria);
        } else {
            res.status(404).json({ mensaje: 'Categoria no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la categoria por ID', error: error });
    }
};

const crearCategoria = async (req, res = express.response) => {
    try {
        const resultado = await claseConnection.insertCategoriasClase(req.body);
        if (resultado ===  1) {
            res.status(201).json({ mensaje: 'Categoria creada correctamente' });
        } else {
            res.status(500).json({ mensaje: 'Error al crear la categoria' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la categoria', error: error });
    }
};

const actualizarCategoria = async (req, res = express.response) => {
    const { id } = req.params;
    try {
        await claseConnection.updateCategoriasClase(id, req.body);
        res.status(200).json({ mensaje: 'Categoria actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la categoria', error: error });
    }
};

const eliminarCategoria = async (req, res = express.response) => {
    const { id } = req.params;
    try {
        await claseConnection.deleteCategoriasClase(id);
        res.status(200).json({ mensaje: 'Categoria eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la categoria', error: error });
    }
};

module.exports = {
    obtenerCategoriaId,
    obtenerCategoriasClases,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};
