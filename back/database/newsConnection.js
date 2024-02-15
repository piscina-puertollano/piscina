require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const models = require("../models/index.js");
const Conexion = require("./connection.js");

const conexion = new Conexion();

class NewsModel {
  constructor() {}

  getAll = async () => {
    let resultado = [];
    try{
        conexion.conectar();
        resultado = await models.News.findAll({
            include:{
              model: models.Users,
              as: "author",
              attributes: ["id","firstName", "lastName"]
          }
        });
        
        conexion.desconectar();
        if (!resultado) {
            throw new Error("No hay noticias");
        }
    }catch(error){
      throw error
    }finally{
      return resultado;
    }
  };

  getById = async (id_new) => {
    let resultado = [];
    try{
        conexion.conectar();
        resultado = await models.News.findByPk(id_new, {
          include:{
            model: models.Users,
            as: "author",
            attributes: ["id","firstName", "lastName"]
        }});
        
        conexion.desconectar();
        if (!resultado) {
            throw new Error("No se ha encontrado la noticia");
        }
    }catch(error){
      throw error
    }finally{
      return resultado;
    }
  };

  createNew = async (newBody) => {
    let resultado = [];
    try{
        conexion.conectar();
        resultado = await models.News.create(newBody);
        
        conexion.desconectar();
        if (!resultado) {
            throw new Error("No se ha encontrado la noticia");
        }
    }catch(error){
      throw error
    }finally{
      return resultado;
    }
  };

  updateNew = async (id, updated_New) => {
    let resultado = [];
    try{
        conexion.conectar();
        resultado = await models.News.findByPk(id);
        resultado.update(updated_New)
        conexion.desconectar();
    }catch(error){
      console.log(error)
      throw error
    }finally{
      if (!resultado) {
        throw new Error("No se ha encontrado la noticia");
      }
      return resultado;
    }
  };

  deleteNewById = async (id_new) => {
    let resultado = [];
    try{
        conexion.conectar();
        resultado = await models.News.destroy(id_new);
        
        conexion.desconectar();
        if (!resultado) {
            throw new Error("No se ha encontrado la noticia");
        }
    }catch(error){
      throw error
    }finally{
      return resultado;
    }
  };

}

module.exports = NewsModel;
