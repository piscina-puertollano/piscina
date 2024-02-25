require("dotenv").config();
const { Sequelize, Model } = require("sequelize");
const models = require("../models/index.js");
const conexion = require("./connection.js");

class ClaseHasUsuarioConnection {
  getClasesHasUsuarios = async () => {
    let clasesHasUsuarios = [];
    try {
      let con = new conexion();
      con.conectar();
      clasesHasUsuarios = models.clase_has_usuario.findAll();
      con.desconectar();
    } catch (error) {
      console.error("Error al obtner los datos", error);
      throw error;
    }
    return clasesHasUsuarios;
  };

  getClaseHasUsuario = async (id_usuario) => {
    let claseHasUsuario;
    let con = new conexion();
    try {
      con.conectar();
      claseHasUsuario = models.clase_has_usuario.findOne({
        where: {
          id_usuario: id_usuario,
        },
        raw: true,
      });
      con.desconectar();
    } catch (error) {
      console.error("Error al obtener datos", error);
      throw error;
    }
    return claseHasUsuario;
  };

  insertClaseHasUsuario = async (data) => {
    let resultado = 0;
    let con = new conexion();
    try {
      con.conectar();
      const nuevoClaseHasUsuario = models.clase_has_usuario.create(data);
      resultado = 1;
      con.desconectar();
    } catch (error) {
      console.error("Error al insertar datos", error);
    }
    return resultado;
  };

  updateClaseHasUsuario = async (id, data) => {
    let con = new conexion();
    try {
      con.conectar();
      const claseHasUsuario = await models.clase_has_usuario.findByPk(id);
      if (!claseHasUsuario) {
        throw new Error(`Usuario con id ${id} no encontrado`);
      }
      await claseHasUsuario.update(data);
      con.desconectar();
    } catch (error) {
      console.error("Error al actualizar", error);
      throw error;
    }
  };

  deleteClaseHasUsuario = async (id) => {
    let con = new conexion();
    try {
      con.conectar();
      const claseHasUsuario = await models.clase_has_usuario.findByPk(id);
      if (!claseHasUsuario) {
        throw new Error(`Usuario con id ${id} no encontrado`);
      }
     await claseHasUsuario.destroy();
      con.desconectar();
    } catch (error) {
      console.error("Error al eliminar", error);
      throw error;
    }
  };
}

module.exports = ClaseHasUsuarioConnection;
