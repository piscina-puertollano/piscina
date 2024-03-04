require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const models = require("../../models");
const Conexion = require("../connection.js");
const { QueryTypes } = require("sequelize");

const conexion = new Conexion();

/**
 * @author: badr
 */
class NewsModel {
  constructor() {}

  getAllByNewId = async (newId) => {
    let resultado = [];
    try {
      conexion.conectar();
      console.log(newId);
      resultado = await models.sequelize.query(
        `SELECT comments.id, comment, author as author_id, respond_to as respond_to_id ,us.firstName as name_author, us.lastName as last_author, us_res.firstName as name_res, us_res.lastName as last_res
        FROM comments
        left join users as us on author = us.id
        left join users as us_res on respond_to = us_res.id
        where id_new = ?`,
        {
          replacements: [newId],
          type: models.sequelize.QueryTypes.SELECT,
        }
      );
      conexion.desconectar();
      if (!resultado) {
        throw new Error("No hay noticias");
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      return resultado;
    }
  };

  getAllByNewIdWithOutRespond = async (newId) => {
    let resultado = [];
    try {
      conexion.conectar();
      console.log(newId);
      resultado = await models.sequelize.query(
        `SELECT comments.id, comment, author as author_id, respond_to as respond_to_id ,us.firstName as name_author, us.lastName as last_author
        FROM comments
        inner join users as us on author = us.id
        where id_new = ?`,
        {
          replacements: [newId],
          type: models.sequelize.QueryTypes.SELECT,
        }
      );
      conexion.desconectar();
      if (!resultado) {
        throw new Error("No hay noticias");
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      return resultado;
    }
  };

  getById = async (id_new) => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.News.findByPk(id_new, {
        attributes: ["id", "title", "body"],
        include: [
          {
            model: models.Users,
            as: "author",
            attributes: ["id", "firstName", "lastName"],
          },
          {
            model: models.Assets,
            as: "new_image",
            attributes: ["ruta"],
          },
        ],
      });

      conexion.desconectar();
      if (!resultado) {
        throw new Error("No se ha encontrado la noticia");
      }
    } catch (error) {
      throw error;
    } finally {
      return resultado;
    }
  };

  createNew = async (newBody) => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.News.create(newBody);

      conexion.desconectar();
      if (!resultado) {
        throw new Error("No se ha encontrado la noticia");
      }
    } catch (error) {
      throw error;
    } finally {
      return resultado;
    }
  };

  updateNew = async (id, updated_New) => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.News.findByPk(id);
      resultado.update(updated_New);
      conexion.desconectar();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      if (!resultado) {
        throw new Error("No se ha encontrado la noticia");
      }
      return resultado;
    }
  };

  deleteNewById = async (id_new) => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.News.destroy(id_new);

      conexion.desconectar();
      if (!resultado) {
        throw new Error("No se ha encontrado la noticia");
      }
    } catch (error) {
      throw error;
    } finally {
      return resultado;
    }
  };
}

module.exports = NewsModel;
