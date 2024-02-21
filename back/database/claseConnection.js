require("dotenv").config();
const { Sequelize, Model } = require("sequelize");
const models = require("../models/index.js");
const conexion = require("./connection.js");

class ClaseConnection {
  getClases = async () => {
    let clases = [];
    let con = new conexion();
    try {
      con.conectar();
      clases = await models.clase.findAll(); // Añade await aquí
    } catch (error) {
      console.error("Error obtener los datos", error);
      throw error;
    } finally {
      con.desconectar();
    }
    return clases;
  };

  getClase = async (id) => {
    let clase;
    let con = new conexion();
    try {
      con.conectar();
      clase = await models.clase.findByPk(id); // Añade await aquí
    } catch (error) {
      console.error("Error al obtener el dato por el id", error);
      throw error;
    } finally {
      con.desconectar();
    }
    return clase;
  };

  getClaseCategoria = async (categoria) => {
    let clase;
    let con = new conexion();
    try {
      con.conectar();
      clase = await models.clase.findAll({
        where: {
          categoria: categoria,
        },
      }); // Añade await aquí
    } catch (error) {
      console.error("Error en getClase:", error);
      throw error;
    } finally {
      con.desconectar();
    }
    return clase;
  };

  insertClase = async (data) => {
    let resultado = 0;
    let con = new conexion();
    try {
      con.conectar();
      const nuevaClase = await models.clase.create(data); // Añade await aquí
      resultado = 1;
    } catch (error) {
      console.error("Error al insertar la clase", error);
    } finally {
      con.desconectar();
    }
    return resultado;
  };

  updateClase = async (id, data) => {
    let con = new conexion();
    try {
      con.conectar();
      const clase = await models.clase.findByPk(id); // Añade await aquí
      if (!clase) {
        throw new Error(`Clase con id ${id} no encontrada`);
      }
      await clase.update(data); // Añade await aquí también
    } catch (error) {
      console.error("Error al actualizar", error);
      throw error;
    } finally {
      con.desconectar();
    }
  };

  deleteClase = async (id) => {
    let con = new conexion();
    try {
      con.conectar();
      const clase = await models.clase.findByPk(id); // Añade await aquí
      if (!clase) {
        throw new Error(`Clase con id ${id} no encontrada`);
      }
      await clase.destroy(); // Añade await aquí también
    } catch (error) {
      console.error("Error al eliminar la clase", error);
      throw error;
    } finally {
      con.desconectar();
    }
  };
}

module.exports = ClaseConnection;
