const { response, request } = require("express");
const ContactConnection = require("../../database/mongo/contactConnection");

const conx = new ContactConnection();

/**
 * @author: badr
 */

const index = async (req, res) => {
  try {
    let resContact = await conx.allContact();

    if (resContact != 0) {
      res.status(200).json(resContact);
    } else {
      res.status(400).json({ msg: "No se ha encontrado ningun contacto" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const create = async (req, res) => {
  try {
    console.log('llego')
    let resContact = await conx.createNewConctact(req.body);
    res.status(200).json(resContact);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const showContact = async (req, res) => {
  try {
    let resContact = await conx.showById(req.params.id);
    if (resContact != 0) {
      res.status(200).json(resContact);
    } else {
      res.status(400).json({ msg: "No se ha encontrado el contacto" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const updateContact = async (req, res) => {
  let idContact = req.params.id;
  let updateFields = req.body;

  try {
    let updatedDocument = await conx.updateById(idContact, updateFields);

    if (updatedDocument == 0) {
      return res
        .status(404)
        .send("No se ha podido actualizar, error con el ID.");
    }

    res.send(updatedDocument);
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "No se ha podido actualizar", error: error });
  }
};

const deleteById = async (req, res) => {
  let idContact = req.params.id;

  try {
    let deletedDocument = await conx.deleteById(idContact);

    if (deletedDocument == 0) {
      return res
        .status(404)
        .send("No se ha podido eliminar, error con el ID.");
    }

    res.send(deletedDocument);
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "No se ha podido eliminar", error: error });
  }
}

module.exports = {
  index,
  create,
  updateContact,
  showContact,
  deleteById
};
