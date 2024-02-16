const {response,request} = require('express');
const Conexion = require('../database/puntuacionConnection')
const conexion = new Conexion();

const puntuacionesGet = (req, res = response) => {
    conexion.getpuntuaciones().then( msg => {
        res.status(200).json(msg);
    }).catch( err => {
        res.status(203).json({ message: 'Error al obtener todas las puntuaciones.', error: err });
    })

}

const puntuacionGetId = (req, res = response) => {
    conexion.getPuntuacionId(req.params.id).then( msg => {
        res.status(200).json(msg)
    }).catch( err => {
        res.status(203).json({ message: 'Error al obtener la puntuacion.', error: err });
    })
}

const puntuacionInsert = (req, res = response) => {
    conexion.insertPuntuacion(req.body).then(msg => {
        res.status(200).json({ message: msg, data: req.body });
    }).catch(err => {
        res.status(203).json(err);
    });
};

const puntuacionUpdate = (req,res = response) => {
    conexion.updatePuntuacion(req.params.id,req.body).then( msg => {
        res.status(200).json({message: msg, data: req.body})
    }).catch( err => {
        res.status(203).json(err)
    })
}

const puntuacionDelete = (req, res = response) => {
    conexion.deletePuntuacion(req.params.id).then(() => {
        res.status(200).json({ message: 'Puntuacion eliminada correctamente.' });
    }).catch(err => {
        res.status(203).json({ message: 'Error al eliminar la puntuacion.', error: err });
    });
};

/* 
LÓGICA PARA PODER ASOCIAR ENTRENAMIENTOS A LAS CALIFICACIONES QUE NO SUPEREN EL 50%
*/

const obtenerEntrenamientoId = () => {}

const asignarEntrenamiento = (puntuacion, userId) => {
    if (puntuacion < 5){
        const entrenamientoId = obtenerEntrenamientoId();

        conexion.updateEntreAsig(userId, entrenamientoId)
            .then(() =>{
                res.status(200).json({ message: 'Entrenamiento asignado'});
            })
            .catch((err) => {
                res.status(203).json({ message: 'Error al asignar entrenamiento'});
            })
    }
}

module.exports = {
    puntuacionesGet,
    puntuacionGetId,
    puntuacionInsert,
    puntuacionUpdate,
    puntuacionDelete
}