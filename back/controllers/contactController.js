const { response, request } = require("express");
const ContactConnection = require("../database/mongo/contactConnection");

const conx = new ContactConnection();

/**
 * @author: badr
 */

const index = async (req, res) => {
  try {
    let resContact = await conx.allSections();

    if (resContact != 0) {
      res.status(200).json(resContact);
    } else {
      res.status(400).json({ msg: "No se han encontrado registros" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const showClub = async (req, res) => {
    try {
      let resContact = await conx.showByTag(req.body.tag);
      if (resContact != 0) {
        res.status(200).json(resContact);
      } else {
        res.status(400).json({ msg: "No se han encontrado registros" });
      }
    } catch (err) {
      res.status(400).json({ error: err });
    }
};

const updateClub = async (req, res) => {
    let idClub = req.params.id;
    let updateFields = req.body;
  
    try {
  
      let updatedDocument = await conx.updateById(idClub, updateFields)
  
      if (updatedDocument == 0) {
        return res.status(404).send("No se ha podido actualizar, error con el ID.");
      }
  
      res.send(updatedDocument);
    } catch (err) {
      console.log(err);
      res.status(400).send({msg:"No se ha podido actualizar",error:error});
    }
  };

  const deleteContact = async (req, res) => {
    let idClub = req.params.id;
    let updateFields = req.body;
  
    try {
  
      let updatedDocument = await conx.updateById(idClub, updateFields)
  
      if (updatedDocument == 0) {
        return res.status(404).send("No se ha podido actualizar, error con el ID.");
      }
  
      res.send(updatedDocument);
    } catch (err) {
      console.log(err);
      res.status(400).send({msg:"No se ha podido actualizar",error:error});
    }
  };

  

module.exports = {
  index,
  updateClub,
  showClub
};
