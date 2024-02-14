require("dotenv").config();
const { Sequelize, Model } = require("sequelize");
const models = require("../models/index.js");
const conexion = require("./connection.js");

class ClaseConnection {
  getClases = async () => {
    let clases = [];
    try {
      let con = new conexion();
      con.conectar();
      clases = models.clase.findAll();
      con.desconectar();
    } catch (error) {
      console.error("Error obtener los datos", error);
      throw error;
    }
    return clases;
  };

  getClase = async (id) => {
    let clase;
    let con = new conexion();
    try {
      con.conectar();
      clase = models.clase.findByPk(id);
    } catch (error) {
      console.error("Error al obtener el dato por el id", error);
      throw error;
    } finally {
      con.desconectar();
    }
    return clase;
  };

  getClaseTemporada = async (temporada) => {
    let clase;
    let con = new conexion();
    try {
      con.conectar();
      clase = models.clase.findAll({
        where: {
          temporada: temporada,
        },
      });
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
      const nuevaClase = models.clase.create(data);
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
      const clase = models.clase.findByPk(id);
      if (!clase) {
        throw new Error(`Clase con id ${id} no encontrada`);
      }
      clase.update(data);
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
      const clase = models.clase.findByPk(id);
      if (!clase) {
        throw new Error(`Clase con id ${id} no encontrado`);
      }
      clase.destroy();
    } catch (error) {
      console.error("Error al eliminar la clase", error);
      throw error;
    } finally {
      con.desconectar();
    }
  };
}

module.exports = ClaseConnection;
