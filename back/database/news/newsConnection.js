require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const models = require("../../models");
const Conexion = require("../connection.js");

const conexion = new Conexion();

/**
 * @author: badr
 */
class NewsModel {
  constructor() {}

  getAll = async () => {
    let resultado = [];
    try{
        conexion.conectar();
        resultado = await models.News.findAll({
          attributes:["id", "title"],
            include:[{
              model: models.Users,
              as: "author",
              attributes: []
          }, 
          {
            model: models.Assets,
            as: "new_image",
            attributes: ["ruta"]
        }
        ],
          
        });
        
        conexion.desconectar();
        if (!resultado) {
            throw new Error("No hay noticias");
        }
    }catch(error){
      console.log(error)
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
          attributes:["id", "title", "body"],
          include:[{
            model: models.Users,
            as: "author",
            attributes: ["id","firstName", "lastName"]
        },
        {
          model: models.Assets,
          as: "new_image",
          attributes: ["ruta"]
      }
    ]
      });
        
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
