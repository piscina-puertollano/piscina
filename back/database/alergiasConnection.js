require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const models = require("../models/index.js");
const Conexion = require("./connection.js");

const conexion = new Conexion();

/**
 * @author: badr
 */

class AlergiasModel {
  constructor() {}

  getAssetById = async (alergiaId) => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.alergias.findOne({
        attributes: ["ruta"],
        where: {
          id: alergiaId,
        },
      });
      conexion.desconectar();
      if (!resultado) {
        throw new Error("Alergia no encontrada");
      }
    } catch (error) {
      throw error;
    } finally {
      return resultado;
    }
  };

  getAll = async () => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.alergias.findAll();
      conexion.desconectar();
    } catch (error) {
      throw error;
    } finally {
      if (!resultado) {
        throw new Error("alergia no encontrada");
      }
      return resultado;
    }
  };

  createAlergia = async (body) => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.alergias.create(body);
      conexion.desconectar();
    } catch (error) {
      throw error;
    } finally {
      if (!resultado) {
        throw new Error("No se ha podido crear la alergia");
      }
      return resultado;
    }
  };


  updateAlergia = async (body) => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.alergias.update(body, {
        where: {
          id: body.id,
        },
      });
      conexion.desconectar();
    } catch (error) {
      throw error;
    } finally {
      if (!resultado) {
        throw new Error("No se ha podido actualizar la alergia");
      }
      return resultado;
    }
  };

  deleteById = async (id) => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.alergias.destroy({
        where: {
          id: id,
        },
      });
      conexion.desconectar();
    } catch (error) {
      throw error;
    } finally {
      if (!resultado) {
        throw new Error("alergia no encontrada");
      }
      return resultado;
    }
  };


  //----------------------------Alergias_User-------------------

  getAlergiasByUserID = async (id) => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.user_alergias.findAll({
        where: {
          user_id: id,
        },
      });
      conexion.desconectar();
    } catch (error) {
      throw error;
    } finally {
      if (!resultado) {
        throw new Error("Este usuario no tiene alergias");
      }
      return resultado;
    }
  };

  saveAlergiaOfUser = async (userId, alergiaId) =>{
    let resultado = [];
    try{

        conexion.conectar();
        resultado = await models.user_alergias.create(
            {
                user_id: userId,
                alergia_id: alergiaId
            }
        );

        conexion.desconectar();
        if (!resultado) {
          throw new Error("No se ha encontrado la alergia");
        }
        return resultado;

    }catch(error){
        throw error;
    }

  }

  deleteAlergiasOfUser = async (userId) =>{
    let resultado = [];
    try{
        conexion.conectar();
        resultado = await models.user_alergias.destroy({
            where: {
              user_id: userId,
            },
          });

        conexion.desconectar();
        if (!resultado) {
          throw new Error("No se ha encontrado la alergia");
        }
        return resultado;

    }catch(error){
        throw error;
    }
  }
}

module.exports = AlergiasModel;
