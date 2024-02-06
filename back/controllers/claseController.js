const { response } = require('express');
const Clase = require('../models/clase');
const Conexion = require('../database/connection');

// Crear una instancia de la clase Conexion
const conexion = new Conexion();

// Controlador para obtener todas las clases
const obtenerClases = async (req, res = response) => {
    // Conectar a la base de datos
    conexion.conectar();

    try {
        const clases = await Clase.findAll();
        console.log('Listado de clases correcto');
        res.status(200).json(clases);
    } catch (error) {
        console.log('No se han encontrado registros de clases');
        res.status(203).json(error);
    } finally {
        // Desconectar de la base de datos
        conexion.desconectar();
    }
}

// Controlador para obtener una clase por su ID
const obtenerClasePorId = async (req, res = response) => {
    // Conectar a la base de datos
    conexion.conectar();

    const { id } = req.params;
    try {
        const clase = await Clase.findByPk(id);
        if (clase) {
            console.log('Clase obtenida correctamente');
            res.status(200).json(clase);
        } else {
            console.log('Clase no encontrada');
            res.status(203).json({ mensaje: 'Clase no encontrada' });
        }
    } catch (error) {
        console.log('Error al obtener la clase por ID');
        res.status(500).json({ mensaje: 'Error al obtener la clase por ID' });
    } finally {
        // Desconectar de la base de datos
        conexion.desconectar();
    }
}

// Controlador para crear una nueva clase
const crearClase = async (req, res = response) => {
    // Conectar a la base de datos
    conexion.conectar();

    try {
        const nuevaClase = await Clase.create(req.body);
        console.log('Clase creada correctamente');
        res.status(200).json(nuevaClase);
    } catch (error) {
        console.log('Error al crear la clase');
        res.status(500).json({ mensaje: 'Error al crear la clase' });
    } finally {
        // Desconectar de la base de datos
        conexion.desconectar();
    }
}

// Controlador para actualizar una clase por su ID
const actualizarClase = async (req, res = response) => {
    const { id } = req.params;
    // Conectar a la base de datos
    conexion.conectar();
    try {
        const [actualizado] = await Clase.update(req.body, { where: { id: id } });
        if (actualizado) {
            console.log('Clase actualizada correctamente');
            res.status(200).json({ mensaje: 'Clase actualizada correctamente' });
        } else {
            console.log('Clase no encontrada');
            res.status(404).json({ mensaje: 'Clase no encontrada' });
        }
    } catch (error) {
        console.log('Error al actualizar la clase');
        res.status(500).json({ mensaje: 'Error al actualizar la clase' });
    } finally {
        // Desconectar de la base de datos
        conexion.desconectar();
    }
}

// Controlador para eliminar una clase por su ID
const eliminarClase = async (req, res = response) => {
    const { id } = req.params;
    // Conectar a la base de datos
    conexion.conectar();
    try {
        const eliminado = await Clase.destroy({ where: { id: id } });
        if (eliminado) {
            console.log('Clase eliminada correctamente');
            res.status(200).json({ mensaje: 'Clase eliminada correctamente' });
        } else {
            console.log('Clase no encontrada');
            res.status(404).json({ mensaje: 'Clase no encontrada' });
        }
    } catch (error) {
        console.log('Error al eliminar la clase');
        res.status(500).json({ mensaje: 'Error al eliminar la clase' });
    } finally {
        // Desconectar de la base de datos
        conexion.desconectar();
    }
}

module.exports = {
    obtenerClases,
    obtenerClasePorId,
    crearClase,
    actualizarClase,
    eliminarClase
};