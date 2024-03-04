/* Manuel Garcia */
const express = require('express');
const FaltasConnection= require('../../database/trainer/faltasConnection');
const faltasConnection= new FaltasConnection();

const obtenerFaltas = async (req, res = express.response) => {
    try {
        const faltas = await faltasConnection.getFaltas();
        res.status(200).json(faltas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las faltas', error: error });
    }
};

const obtenerFaltaPorId = async (req, res = express.response) => {
    const { id } = req.params;
    try {
        const falta = await faltasConnection.getFalta(id);
        if (falta) {
            res.status(200).json(falta);
        } else {
            res.status(404).json({ mensaje: 'Falta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la falta por ID', error: error });
    }
};

const crearFalta = async (req, res = express.response) => {
    try {
        const resultado = await faltasConnection.insertFalta(req.body);
        if (resultado ===   1) {
            res.status(201).json({ mensaje: 'Falta creada correctamente' });
        } else {
            res.status(500).json({ mensaje: 'Error al crear la falta' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la falta', error: error });
    }
};

const actualizarFalta = async (req, res = express.response) => {
    const { id } = req.params;
    try {
        await faltasConnection.updateFalta(id, req.body);
        res.status(200).json({ mensaje: 'Falta actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la falta', error: error });
    }
};

const eliminarFalta = async (req, res = express.response) => {
    const { id } = req.params;
    try {
        await faltasConnection.deleteFalta(id);
        res.status(200).json({ mensaje: 'Falta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la falta', error: error });
    }
};

module.exports = {
    obtenerFaltas,
    obtenerFaltaPorId,
    crearFalta,
    actualizarFalta,
    eliminarFalta
};
