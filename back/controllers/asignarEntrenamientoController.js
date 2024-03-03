/**
 * @author: Marina Laguna
 */
const conexionEntrenamiento = require('../database/ejercicioEntrenamientoConnection');

const obtenerEntrenamientoId = async (id) => {
    try {
        const entrenamiento = await conexionEntrenamiento.getEntrenamientoId(id);

        if (!entrenamiento) {
            throw new Error('No se pudo encontrar el entrenamiento');
        }

        return entrenamiento;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        conexionEntrenamiento.desconectar();
    }
};

const asignarEntrenamiento = async (req, res) => {
    try {
        const idEntrenamiento = req.body.idEntrenamiento;
        const entrenamiento = await obtenerEntrenamientoId(idEntrenamiento);

        if (!entrenamiento) {
            return res.status(404).json({ error: 'No se encontró el entrenamiento' });
        }

        return res.status(200).json({ message: 'Se ha asignado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = {
    asignarEntrenamiento,
};