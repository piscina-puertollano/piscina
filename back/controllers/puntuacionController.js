const {response,request} = require('express');
const Conexion = require('../database/puntuacionConnection');
const ConexionEntrenamiento = require('../database/entrenamientoConnection');
const AsignacionController = require('./asignarEntrenamientoController');
const conexion = new Conexion();
const conexionEntrenamiento = new ConexionEntrenamiento();

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

const puntuacionInsert = async (req, res = response) => {
    const { nota, userId, idEntrenamiento } = req.body;

    try {
        if (nota < 5) {
            if (idEntrenamientoExistente(idEntrenamiento)) {
                const msg = await conexion.insertPuntuacion(req.body);
                res.status(200).json({ message: msg, data: req.body });
                await AsignacionController.asignarEntrenamiento(req, res);
            } else {
                res.status(203).json({ message: 'El idEntrenamiento no es válido' });
            }
        } else {
            res.status(203).json({ message: 'La nota es mayor o igual a 5, no se puede asociar un entrenamiento' });
        }
    } catch (error) {
        console.error(error);

        // Evita enviar múltiples respuestas al cliente
        if (!res.headersSent) {
            // Envía una respuesta de error al cliente solo si los encabezados no se han enviado
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

const idEntrenamientoExistente = async (idEntrenamiento) => {
    try {
        const entrenamiento = await conexionEntrenamiento.getEntrenamientoId(idEntrenamiento);
        return entrenamiento !== null;
    } catch (error) {
        console.error('Error al verificar la existencia del idEntrenamiento:', error);
        return false;
    }
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

module.exports = {
    puntuacionesGet,
    puntuacionGetId,
    puntuacionInsert,
    puntuacionUpdate,
    puntuacionDelete
}