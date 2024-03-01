//Manuel Garcia
const express = require("express");
const ClaseHasUsuarioConnection = require("../database/claseHasUsuarioConnection");
const claseHasUsuarioConnection = new ClaseHasUsuarioConnection();

const obtenerClasesHasUsuarios = async (req, res = express.response) => {
  try {
    const clasesHasUsuarios =
      await claseHasUsuarioConnection.getClasesHasUsuarios();
    res.status(200).json(clasesHasUsuarios);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los datos",
      error: error,
    });
  }
};

const obtenerClaseHasUsuarioPorIds = async (req, res = express.response) => {
  const { id_usuario } = req.params;
  try {
    const claseHasUsuario = await claseHasUsuarioConnection.getClaseHasUsuario(
      id_usuario
    );
    if (claseHasUsuario) {
      res.status(200).json(claseHasUsuario);
    } else {
      res.status(404).json({ mensaje: "Datos no encontrados" });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los datos",
      error: error,
    });
  }
};

const crearClaseHasUsuario = async (req, res = express.response) => {
  try {
    const resultado = await claseHasUsuarioConnection.insertClaseHasUsuario(
      req.body
    );
    if (resultado === 1) {
      res.status(201).json({ mensaje: "Datos insertados correctamente" });
    } else {
      res.status(500).json({ mensaje: "Error al insertar" });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al insertar",
      error: error,
    });
  }
};

const actualizarClaseHasUsuario = async (req, res = express.response) => {
  const { id } = req.params;
  try {
    await claseHasUsuarioConnection.updateClaseHasUsuario(id, req.body);
    res.status(200).json({ mensaje: "Datos actualizados correctamente" });
  } catch (error) {
    res.status(500).json({
      mensaje: "No se pueden actualizar los datos",
      error: error,
    });
  }
};

const eliminarClaseHasUsuario = async (req, res = express.response) => {
  const { id } = req.params;
  try {
    await claseHasUsuarioConnection.deleteClaseHasUsuario(id);
    res.status(200).json({ mensaje: "Datos eliminados correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar ", error: error });
  }
};

module.exports = {
  obtenerClasesHasUsuarios,
  obtenerClaseHasUsuarioPorIds,
  crearClaseHasUsuario,
  actualizarClaseHasUsuario,
  eliminarClaseHasUsuario,
};
