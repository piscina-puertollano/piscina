const express = require('express');
const ClaseConnection = require('../database/claseHasUsuarioConnection');
const claseConnection = new ClaseConnection();

const obtenerClases = async (req, res = express.response) => {
    try {
        const clases = await claseConnection.getClasesHasUsuarios();
        res.status(200).json(clases);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las clases', error: error });
    }
};


const obtenerClasePorId = async (req, res = express.response) => {
    const { id } = req.params;
    try {
        const clase = await claseConnection.getClaseHasUsuarioById(id); // Cambio aquí
        if (clase) {
            res.status(200).json(clase);
        } else {
            res.status(404).json({ mensaje: 'Clase no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la clase por ID', error: error });
    }
};


const crearClase = async (req, res = express.response) => {
    try {
        const resultado = await claseConnection.insertClase(req.body); // Cambio aquí
        if (resultado ===  1) {
            res.status(201).json({ mensaje: 'Clase creada correctamente' });
        } else {
            res.status(500).json({ mensaje: 'Error al crear la clase' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la clase', error: error });
    }
};

const actualizarClase = async (req, res = express.response) => {
    const { id } = req.params;
    try {
        await claseConnection.updateClase(id, req.body); // Cambio aquí
        res.status(200).json({ mensaje: 'Clase actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la clase', error: error });
    }
};

const eliminarClase = async (req, res = express.response) => {
    const { id } = req.params;
    try {
        await claseConnection.deleteClase(id); // Cambio aquí
        res.status(200).json({ mensaje: 'Clase eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la clase', error: error });
    }
};

module.exports = {
    obtenerClases,
    obtenerClasePorId,
    crearClase,
    actualizarClase,
    eliminarClase
};