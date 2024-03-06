/**
 * @author Marina Laguna
 */
const {response,request} = require('express');
const Conexion = require('../../database/training/puntuacionConnection');
const ConexionEntrenamiento = require('../../database/training/ejercicioEntrenamientoConnection');
const AsignacionController = require('./asignarEntrenamientoController');
const conexion = new Conexion();
const conexionEntrenamiento = new ConexionEntrenamiento();

const sociosGet = (req, res = response) => {
    conexion.getSocios().then(msg => {
        res.status(200).json(msg);
    }).catch( err => {
        res.status(203).json({ message: 'Error al obtener los usuarios que son socios.', error: err});
    })
}
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

const puntuacionGetSocioId = (req, res) => {
    const socioId = req.params.socioId; 
    conexion.getPuntuacionSocioId(socioId).then(msg => {
        res.status(200).json(msg);
    }).catch( err => {
        res.status(203).json({ message: 'Error al obtener la puntuación.', error: err });
    });
};

const puntuacionInsert = async (req, res = response) => {
    const { nota, userId, idEntrenamiento } = req.body;

    if (nota >= 5) {
        req.body.idEntrenamiento = null;
    }

    try {
        const puntuacionExistente = await conexion.getPuntuacionExistente(userId, idEntrenamiento);

        if (puntuacionExistente) {
            return res.status(203).json({ message: 'La puntuación ya está registrada para este usuario' });
        }

        const msg = await conexion.insertPuntuacion(req.body);
        const idPuntuacion = msg.id;

        if (nota < 5) {
            const entrenamientoExiste = await conexionEntrenamiento.getEntrenamientoId(idEntrenamiento);
            if (!entrenamientoExiste) {
                return res.status(203).json({ message: 'El idEntrenamiento no es válido' });
            }
            await AsignacionController.asignarEntrenamiento(req, res);
            return res.status(200).json({ message: 'Puntuacion creada correctamente con su asignacion.', data: req.body });
        } else {
            return res.status(200).json({ message: 'Puntuacion creada correctamente. No se puede asignar un entrenamiento.', data: { nota, userId, idEntrenamiento: null } });
        }
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            return res.status(500).json({ error: 'Error en el servidor' });
        }
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

const getTutorUsers = async (req, res) => {
    try {
        const userId = req.params.userId; 
        const socios = await conexion.getTutorUsers(userId);

        res.status(200).json(socios);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    sociosGet,
    puntuacionesGet,
    puntuacionGetSocioId,
    puntuacionGetId,
    puntuacionInsert,
    puntuacionUpdate,
    puntuacionDelete,
    getTutorUsers
}