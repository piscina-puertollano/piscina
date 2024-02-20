const conexionEntrenamiento = require('../database/entrenamientoConnection');

const obtenerEntrenamientoId = async (id) => {
    try {
        const entrenamiento = await conexionEntrenamiento.getEntrenamientoId(id);

        if (!entrenamiento) {
            throw new Error('No se pudo encontrar el entrenamiento con el ID especificado');
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

        // Verifica si el entrenamiento es undefined o null antes de acceder a sus propiedades
        if (!entrenamiento) {
            return res.status(404).json({ error: 'No se encontró el entrenamiento con el ID proporcionado' });
        }

        // Realiza las operaciones necesarias con el entrenamiento

        // Envía una respuesta exitosa al cliente
        return res.status(200).json({ message: 'Operación exitosa' });
    } catch (error) {
        console.error(error);
        // Envía una respuesta de error al cliente
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    asignarEntrenamiento,
};