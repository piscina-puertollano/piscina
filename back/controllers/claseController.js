const express = require('express');
const ClaseConnection = require('../database/claseConnection');
const claseConnection = new ClaseConnection();

const obtenerClases = async (req, res = express.response) => {
    try {
        const clases = await claseConnection.getClases();
        res.status(200).json(clases);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los datos', error: error });
    }
};

const obtenerClasePorId = async (req, res = express.response) => {
    const { id } = req.params;
    try {
        const clase = await claseConnection.getClase(id);
        if (clase) {
            res.status(200).json(clase);
        } else {
            res.status(404).json({ mensaje: 'Clase no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener datos por ID', error: error });
    }
};

const obtenerTemporadaPorId = async (req, res = express.response) => {
    const { temporada } = req.params;
    try {
        const clase = await claseConnection.getClaseTemporada(temporada);
        if (clase) {
            res.status(200).json(clase);
        } else {
            res.status(404).json({ mensaje: 'Clase no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener datos por ID', error: error });
    }
};

const crearClase = async (req, res = express.response) => {
    try {
        const resultado = await claseConnection.insertClase(req.body);
        if (resultado ===  1) {
            res.status(201).json({ mensaje: 'Clase creada correctamente' });
        } else {
            res.status(500).json({ mensaje: 'Error al crear ' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear ', error: error });
    }
};

const actualizarClase = async (req, res = express.response) => {
    const { id } = req.params;
    try {
        await claseConnection.updateClase(id, req.body);
        res.status(200).json({ mensaje: 'Clase actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar ', error: error });
    }
};

const eliminarClase = async (req, res = express.response) => {
    const { id } = req.params;
    try {
        await claseConnection.deleteClase(id);
        res.status(200).json({ mensaje: 'Clase eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar ', error: error });
    }
};

module.exports = {
    obtenerClases,
    obtenerClasePorId,
    obtenerTemporadaPorId,
    crearClase,
    actualizarClase,
    eliminarClase
};