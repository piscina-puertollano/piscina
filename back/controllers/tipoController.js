/**
 * author: Marina Laguna
 */
const {response,request} = require('express');
const Conexion = require('../database/tipoConnection')
const conexion = new Conexion();

const tiposGet = (req, res = response) => {
    conexion.getTipos().then( msg => {
        res.status(200).json(msg);
    }).catch( err => {
        res.status(203).json({ message: 'Error al obtener todos los tipos de ejercicios.', error: err });
    })
}

module.exports = {
    tiposGet,
}