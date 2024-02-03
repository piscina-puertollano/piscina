const {response,request} = require('express');
const Conexion = require('../database/entrenamientoConnection')
const conexion = new Conexion();

const entrenamientosGet = (req, res = response) => {
    conexion.getEntrenamientos().then( msg => {
        res.status(200).json(msg);
    }).catch( err => {
        res.status(203).json({ message: 'Error al obtener todos los entrenamientos.', error: err });
    })

}

const entrenamientoGetId = (req, res = response) => {
    conexion.getEntrenamientoId(req.params.id).then( msg => {
        res.status(200).json(msg)
    }).catch( err => {
        res.status(203).json({ message: 'Error al obtener el entrenamiento.', error: err });
    })
}

const entrenamientoInsert = (req, res = response) => {
    conexion.insertEntrenamiento(req.body).then(msg => {
        res.status(200).json({ message: msg, data: req.body });
    }).catch(err => {
        res.status(203).json(err);
    });
};

const entrenamientoUpdate = (req,res = response) => {
    conexion.updateEntrenamiento(req.params.id,req.body).then( msg => {
        res.status(200).json({message: msg, data: req.body})
    }).catch( err => {
        res.status(203).json(err)
    })
}

const entrenamientoDelete = (req, res = response) => {
    conexion.deleteEntrenamiento(req.params.id).then(() => {
        res.status(200).json({ message: 'Entrenamiento eliminado correctamente.' });
    }).catch(err => {
        res.status(203).json({ message: 'Error al eliminar el entrenamiento.', error: err });
    });
};

module.exports = {
    entrenamientosGet,
    entrenamientoGetId,
    entrenamientoInsert,
    entrenamientoUpdate,
    entrenamientoDelete
}