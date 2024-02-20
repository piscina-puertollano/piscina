/**
 * author: Marina Laguna
 */
const {response,request} = require('express');
const Conexion = require('../database/ejercicioConnection')
const conexion = new Conexion();

const ejercicioGet = (req, res = response) => {
    conexion.getEjercicios().then( msg => {
        res.status(200).json(msg);
    }).catch( err => {
        res.status(203).json({ message: 'Error al obtener todos los ejercicios.', error: err });
    })

}

const ejercicioGetId = (req, res = response) => {
    conexion.getEjercicioId(req.params.id).then( msg => {
        res.status(200).json(msg)
    }).catch( err => {
        res.status(203).json({ message: 'Error al obtener el ejercicio.', error: err });
    })
}

const ejercicioInsert = (req, res = response) => {
    conexion.insertEjercicio(req.body).then(msg => {
        res.status(200).json({ message: msg, data: req.body });
    }).catch(err => {
        res.status(203).json(err);
    });
};

const ejercicioUpdate = (req,res = response) => {
    conexion.updateEjercicio(req.params.id,req.body).then( msg => {
        res.status(200).json({message: msg, data: req.body})
    }).catch( err => {
        res.status(203).json(err)
    })
}

const ejercicioDelete = (req, res = response) => {
    conexion.deleteEjercicio(req.params.id).then(() => {
        res.status(200).json({ message: 'Ejercicio eliminado correctamente.' });
    }).catch(err => {
        res.status(203).json({ message: 'Error al eliminar el ejercicio.', error: err });
    });
};

module.exports = {
    ejercicioGet,
    ejercicioGetId,
    ejercicioInsert,
    ejercicioUpdate,
    ejercicioDelete
}