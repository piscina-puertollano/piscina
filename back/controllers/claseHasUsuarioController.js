const express = require('express');
const ClaseHasUsuarioConnection = require('../database/claseHasUsuarioConnection');
const claseHasUsuarioConnection = new ClaseHasUsuarioConnection();

const obtenerClasesHasUsuarios = async (req, res = express.response) => {
    try {
        const clasesHasUsuarios = await claseHasUsuarioConnection.getClasesHasUsuarios();
        res.status(200).json(clasesHasUsuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las clases y usuarios', error: error });
    }
};

const obtenerClaseHasUsuarioPorIds = async (req, res = express.response) => {
    const { usuario_idusuario, clase_idclase } = req.params;
    try {
        const claseHasUsuario = await claseHasUsuarioConnection.getClaseHasUsuario(usuario_idusuario, clase_idclase);
        if (claseHasUsuario) {
            res.status(200).json(claseHasUsuario);
        } else {
            res.status(404).json({ mensaje: 'Relación entre usuario y clase no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la relación entre usuario y clase por IDs', error: error });
    }
};

const crearClaseHasUsuario = async (req, res = express.response) => {
    try {
        const resultado = await claseHasUsuarioConnection.insertClaseHasUsuario(req.body);
        if (resultado ===  1) {
            res.status(201).json({ mensaje: 'Relación creada correctamente' });
        } else {
            res.status(500).json({ mensaje: 'Error al crear la relación entre usuario y clase' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la relación entre usuario y clase', error: error });
    }
};

const actualizarClaseHasUsuario = async (req, res = express.response) => {
    const { id } = req.params;
    try {
        await claseHasUsuarioConnection.updateClaseHasUsuario(id, req.body);
        res.status(200).json({ mensaje: 'Relación actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la relación entre usuario y clase', error: error });
    }
};

const eliminarClaseHasUsuario = async (req, res = express.response) => {
    const { id } = req.params;
    try {
        await claseHasUsuarioConnection.deleteClaseHasUsuario(id);
        res.status(200).json({ mensaje: 'Relación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la relación entre usuario y clase', error: error });
    }
};

module.exports = {
    obtenerClasesHasUsuarios,
    obtenerClaseHasUsuarioPorIds,
    crearClaseHasUsuario,
    actualizarClaseHasUsuario,
    eliminarClaseHasUsuario
};