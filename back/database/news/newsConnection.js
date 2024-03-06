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
    try {
      conexion.conectar();
      resultado = await models.News.findAll({
        attributes: ["id", "title", "category"],
        include: [
          {
            model: models.Users,
            as: "author",
            attributes: [],
          },
          {
            model: models.Assets,
            as: "new_image",
            attributes: ["ruta"],
          },
        ]
      });

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
        attributes: ["id", "title", "body", "visit_counter", "share_counter", "likes_counter", "dislikes_counter"],
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

  getLatestNews = async () => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.News.findOne({
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
        order: [["createdAt", "DESC"]],
        limit: 1
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

  getLastPopular = async () => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.sequelize.query(
        `SELECT n.id, n.title, n.body, u.id AS author_id, u.firstName, u.lastName, a.ruta AS new_image_ruta
    FROM news AS n LEFT JOIN users AS u ON n.id_user = u.id LEFT JOIN assets AS a ON n.main_image = a.id
    ORDER BY n.createdAt DESC LIMIT 1    
        `,
        {
          type: models.sequelize.QueryTypes.SELECT,
        }
      );

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

  getPopularDay = async () => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.sequelize.query(
        `SELECT * FROM news
        WHERE id = (
            SELECT COALESCE(
                (SELECT id FROM news WHERE createdAt >= NOW() - INTERVAL 1 DAY ORDER BY visit_counter DESC, likes_counter DESC LIMIT 1),
                (SELECT id FROM news ORDER BY visit_counter DESC, likes_counter DESC LIMIT 1)
            )
        );
        `,
        {
          type: models.sequelize.QueryTypes.SELECT,
        }
      );

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

  getAllSummaries = async () => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.News.findAll({
        attributes: ["id", "summary"],
        order: [["visit_counter", "DESC"]],
        limit: 10,
      });

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


  getNewsWithLowerVisits = async () => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.News.findAll({
        order: [["visit_counter", "ASC"]],
        limit: 10
      });

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

  getNewShortReed = async () => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.News.findAll({
        attributes: ["id", "title"],
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
        order: [["duration", "DESC"]],
        limit: 10,
      });

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

  createNew = async (newBody) => {
    let resultado = [];
    try {
      console.log(newBody);
      conexion.conectar();
      resultado = await models.News.create(newBody);

      conexion.desconectar();
      if (!resultado) {
        throw new Error("No se ha encontrado la noticia");
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      return resultado;
    }
  };

  getNewByCategory = async (category) => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.News.findAll({
        attributes: ["id", "title", "category"],
        where: {
          category: category,
        },
        include: [
          {
            model: models.Users,
            as: "author",
            attributes: [],
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

  updateView = async (id_new) => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.News.findByPk(id_new);
      /**
       * Increment es un método que ofrece sequelize para sumar +1
       * documentación de sequelize: https://sequelize.org/docs/v6/core-concepts/model-instances/#incrementing-and-decrementing-integer-values
       */

      resultado.increment("visit_counter");
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

  incrementLike = async (id_new) => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.News.findByPk(id_new);
      resultado.increment("likes_counter");
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


  incrementDisLike = async (id_new) => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.News.findByPk(id_new);
      resultado.increment("dislikes_counter");
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

  incrementShare = async (id_new) => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.News.findByPk(id_new);
      resultado.increment("share_counter");
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
      console.log(id_new);
      resultado = await models.News.findByPk(id_new);
      resultado.destroy();

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
