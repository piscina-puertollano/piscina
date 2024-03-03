const { response, request } = require("express");
const comConexion = require("../database/commentsConnection");

const conx = new comConexion();

/**
 * @author: badr
 */

const index = async (req, res) => {
  try {
    let resComment = await conx.getAllByNewId(req.params.id_new);

    if (resComment != 0) {
      let rtnComment = {
        comments: resComment.comment,
        author: resComment.name_author + " " + resComment.last_author,
        author_id: resComment.author_id,
        respond_to: resComment.name_res + " " + resComment.last_res,
        respond_to_id: resComment.respond_to_id,
        id_new: resComment.id_new,
      };
      res.status(200).json(resComment);
    } else {
      res.status(400).json({ msg: "No se han encontrado el comentario" });
    }
  } catch (err) {
    res.status(400).json({ error: "Ha ocurrido un error" });
  }
};

const createComment = async (req, res) => {
  req.body.id_user = req.userId;
  await conx
    .createNew(req.body)
    .then((resNew) => {
      res.status(200).json(resNew);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ msg: "No se ha podido crear la noticia", error: err });
    });
};

const destroyComment = async (req, res) => {
  try {
    let resComment = await conx.createNew(req.params.id_new);
    if (resComment != 0) {
      res.status(200).json(resComment);
    } else {
      res.status(400).json({ msg: "No se ha podido crear la noticia" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = {
  index,
  createComment,
  destroyComment,
};
