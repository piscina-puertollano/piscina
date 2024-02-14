require("dotenv").config();
const { Sequelize, Model } = require("sequelize");
const models = require("../models/index.js");
const conexion = require("./connection.js");

class FaltasConnection {
  getFaltas = async () => {
    let faltas = [];
    try {
      let con = new conexion();
      con.conectar();
      faltas = models.faltas.findAll();
      con.desconectar();
    } catch (error) {
      console.error("Error en getFaltas:", error);
      throw error;
    }
    return faltas;
  };

  getFalta = async (id_usuario) => {
    let falta;
    let con = new conexion();
    try {
      con.conectar();
      falta = models.faltas.findAll({
        where: {
          id_usuario: id_usuario,
        },
      });
      con.desconectar();
    } catch (error) {
      console.error("Error en getFalta:", error);
      throw error;
    }
    return falta;
  };

  insertFalta = async (data) => {
    let resultado = 0;
    let con = new conexion();
    try {
      con.conectar();
      const nuevaFalta = models.faltas.create(data);
      resultado = 1;
      con.desconectar();
    } catch (error) {
      console.error("Error en insertFalta:", error);
    }
    return resultado;
  };

  updateFalta = async (id, data) => {
    let con = new conexion();
    try {
      con.conectar();
      const falta = models.faltas.findByPk(id);
      if (!falta) {
        console.error(`Falta with id ${id} not found.`);
        throw new Error(`Falta with id ${id} not found.`);
      }
      falta.update(data);
      con.desconectar();
    } catch (error) {
      console.error("Error en updateFalta:", error);
      throw error;
    }
  };

  deleteFalta = async (id) => {
    let con = new conexion();
    try {
      con.conectar();
      const falta = models.faltas.findByPk(id);
      if (!falta) {
        console.error(`Falta with id ${id} not found.`);
        throw new Error(`Falta with id ${id} not found.`);
      }
      falta.destroy();
      con.desconectar();
    } catch (error) {
      console.error("Error en deleteFalta:", error);
      throw error;
    }
  };
}

module.exports = FaltasConnection;
