/**
 * @author Marina Laguna
 */
const conexionEntrenamiento = require('../../database/training/ejercicioEntrenamientoConnection');
const entrenamientoConnection = new conexionEntrenamiento();

const obtenerEntrenamientoId = async (id) => {
    try {
        if (typeof entrenamientoConnection.getEntrenamientoId !== 'function') {
            throw new Error('La función getEntrenamientoId no está definida en conexionEntrenamiento');
        }

        const entrenamiento = await entrenamientoConnection.getEntrenamientoId(id);

        if (!entrenamiento) {
            throw new Error('No se pudo encontrar el entrenamiento');
        }

        return entrenamiento;
    } catch (error) {
        throw error;
    }
};

const asignarEntrenamiento = async (req, res) => {
    try {
        const idEntrenamiento = req.body.idEntrenamiento;

        const entrenamiento = await obtenerEntrenamientoId(idEntrenamiento);

        if (!entrenamiento) {
            return res.status(404).json({ error: 'No se encontró el entrenamiento' });
        }

    } catch (error) {
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = {
    asignarEntrenamiento,
};