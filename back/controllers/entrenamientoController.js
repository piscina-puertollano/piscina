/**
 * @author: Marina Laguna
 */
const {response, request} = require('express');
const Conexion = require('../database/ejercicioEntrenamientoConnection')
const conexion = new Conexion();

const entrenamientosGet = (req, res = response) => {
    conexion.getEntrenamientos().then( msg => {
        res.status(200).json(msg);
    }).catch( err => {
        res.status(203).json({ message: 'Error al obtener todos los entrenamientos.', error: err });
    })

}

module.exports = {
    entrenamientosGet,
}