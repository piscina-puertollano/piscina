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
        `SELECT comments.id, comment, author AS author_id, res.respond_to AS respond_to_id, us.firstName AS name_author,
        us.lastName AS last_author FROM comments INNER JOIN users AS us ON author = us.id 
        LEFT JOIN respond_comments AS res ON comments.id = res.id_comment
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
      resultado = await models.Comments.findByPk(id_new, {
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

  createComment = async (newBody) => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.Comments.create(newBody);

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

  respondComment = async (newBody) => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.respond_comment.create(newBody);

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

  updateComment = async (id, updated_New) => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.Comments.findByPk(id);
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

  deleteCommentById = async (id_new) => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.Comments.findByPk(id_new);
      await resultado.destroy();
      conexion.desconectar();

    } catch (error) {
      console.log(error)
      throw error;
    } finally {
      if (!resultado) {
        throw new Error("No se ha encontrado la noticia");
      }
      return resultado;
    }
  };
}

module.exports = NewsModel;
