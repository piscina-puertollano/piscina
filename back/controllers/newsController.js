const { response, request } = require("express");
const newsConnection = require("../database/newsConnection");

const conx = new newsConnection();

/**
 * @author: badr
 */

const index = async (req, res) => {
  try {
    let resNew = await conx.getAll();

    if (resNew != 0) {
      res.status(200).json(resNew);
    } else {
      res.status(400).json({ msg: "No se han encontrado noticias" });
    }
  } catch (err) {
    res.status(400).json({ error: 'Ha ocurrido un error' });
  }
};

const show = async (req, res) => {
  try {
    let resNew = await conx.getById(req.params.id);

    if (resNew != 0) {
      res.status(200).json(resNew);
    } else {
      res.status(400).json({ msg: "No se han encontrado noticias" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const createNew = async (req, res) => {
    req.body.id_user = req.userId;
    await conx.createNew(req.body).then(resNew=>{
      res.status(200).json(resNew);
    }).catch(err=>{
      console.log(err)
      res.status(400).json({ msg: "No se ha podido crear la noticia", error: err });
    });
    
};

const updateNew = async (req, res) => {
  await conx.updateNew(req.params.id, req.body).then((msg)=>{
    console.log(msg)
    res.status(200).json(msg);
  }).catch((err)=>{
    res.status(400).json({ msg: "No se ha podido crear la noticia", error: err});
  })
};


const destroyNew = async (req, res) => {
  try {
    let resNew = await conx.createNew(req.params.id);
    if (resNew != 0) {
      res.status(200).json(resNew);
    } else {
      res.status(400).json({ msg: "No se ha podido crear la noticia" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = {
  index,
  show,
  createNew,
  destroyNew,
  updateNew
};
