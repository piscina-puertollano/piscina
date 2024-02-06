const { Clase } = require('../models'); // Asegúrate de que el modelo esté correctamente definido en '../models/clase'

// Controlador para crear una nueva clase
async function crearClase(req, res) {
  try {
    const nuevaClase = await Clase.create(req.body);
    res.status(201).json(nuevaClase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la clase' });
  }
}

// Controlador para obtener todas las clases
async function obtenerClases(req, res) {
  try {
    const clases = await Clase.findAll();
    res.status(200).json(clases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las clases' });
  }
}

// Controlador para obtener una clase por su ID
async function obtenerClasePorId(req, res) {
  const { id } = req.params;
  try {
    const clase = await Clase.findByPk(id);
    if (clase) {
      res.status(200).json(clase);
    } else {
      res.status(404).json({ mensaje: 'Clase no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener la clase' });
  }
}

// Controlador para actualizar una clase por su ID
async function actualizarClase(req, res) {
  const { id } = req.params;
  try {
    const [actualizado] = await Clase.update(req.body, {
      where: { id: id }
    });
    if (actualizado) {
      res.status(200).json({ mensaje: 'Clase actualizada correctamente' });
    } else {
      res.status(404).json({ mensaje: 'Clase no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar la clase' });
  }
}

// Controlador para eliminar una clase por su ID
async function eliminarClase(req, res) {
  const { id } = req.params;
  try {
    const eliminado = await Clase.destroy({
      where: { id: id }
    });
    if (eliminado) {
      res.status(200).json({ mensaje: 'Clase eliminada correctamente' });
    } else {
      res.status(404).json({ mensaje: 'Clase no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la clase' });
  }
}

module.exports = {
  crearClase,
  obtenerClases,
  obtenerClasePorId,
  actualizarClase,
  eliminarClase
};
