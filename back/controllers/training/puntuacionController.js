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

const puntuacionInsert = async (req, res = response) => {
    const { nota, userId, idEntrenamiento } = req.body;

    try {
        const puntuacionExistente = await conexion.getPuntuacionExistente(userId, idEntrenamiento);

        if (puntuacionExistente) {
            return res.status(203).json({ message: 'La puntuación ya está registrada para este usuario' });
        }

        if (nota < 5) {
            if (await idEntrenamientoExistente(idEntrenamiento)) {
                const msg = await conexion.insertPuntuacion(req.body);
                await AsignacionController.asignarEntrenamiento(req, res);
                return res.status(200).json({ message: 'Puntuacion creada correctamente con su asignacion.', data: req.body });
            } else {
                return res.status(203).json({ message: 'El idEntrenamiento no es válido' });
            }
        } else {
            const msg = await conexion.insertPuntuacion(req.body);
            return res.status(200).json({ message: 'Puntuacion creada correctamente.', data: { nota, userId, idEntrenamiento } });
        }
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            return res.status(500).json({ error: 'Error en el servidor' });
        }
    }
};

const idEntrenamientoExistente = async (idEntrenamiento) => {
    try {
        const entrenamiento = await conexionEntrenamiento.getEntrenamientoId(idEntrenamiento);
        return entrenamiento !== null;
    } catch (error) {
        console.error('Error al verificar al encontrar el entrenamiento:', error);
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
    sociosGet,
    puntuacionesGet,
    puntuacionGetId,
    puntuacionInsert,
    puntuacionUpdate,
    puntuacionDelete
}