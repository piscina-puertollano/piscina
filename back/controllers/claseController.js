const { Clase } = require("../models/clase.js");

// Controlador para crear una nueva clase
async function crearClase(req, res) {
  try {
    // Creamos una nueva instancia de Clase con los datos recibidos en el cuerpo de la solicitud
    const nuevaClase = await Clase.create();

    // Enviamos la nueva instancia de Clase como respuesta con el código de estado 201 (creado)
    res.status(201).json(nuevaClase);
  } catch (error) {
    // Si hay algún error, lo capturamos y enviamos una respuesta de error con el código 500 (error interno del servidor)
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la clase' });
  }
}

module.exports = {
  crearClase
};
