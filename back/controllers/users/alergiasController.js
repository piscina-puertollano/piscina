const { response, request } = require("express");
const comConexion = require("../../database/users/alergiasConnection");

const conx = new comConexion();

/**
 * @author: badr
 */

const index = async(req, res) => {
    try {
        let resAlergias = await conx.getAll();
        if (resAlergias != 0) {
            res.status(200).json(resAlergias);
        } else {
            res.status(400).json({ msg: "No se han encontrado alergias" });
        }
    } catch (err) {
        res.status(400).json({ error: "Ha ocurrido un error" });
    }
}

const showAlergiasOfUser = async (req, res) => {
  try {
    let resAlergias = await conx.getAlergiasByUserID(req.params.id_user);

    if (resAlergias != 0) {
      res.status(200).json(resAlergias);
    } else {
      res.status(200).json({ msg: "Usuario sin alergias" });
    }
  } catch (err) {
    res.status(400).json({ error: "Ha ocurrido un error" });
  }
};

const showMyAlergias = async (req, res) => {
  try {
    let resAlergias = await conx.showAlergiasOfUser(req.userId);

    if (resAlergias != 0) {
      res.status(200).json(resAlergias);
    } else {
      res.status(400).json({ msg: "No se han encontrado la alergia" });
    }
  } catch (err) {
    res.status(400).json({ error: "Ha ocurrido un error" });
  }
};

const createAlergia = async (req, res) => {
  req.body.id_user = req.userId;
  await conx
    .createAlergia(req.body)
    .then((resNew) => {
      res.status(200).json(resNew);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ msg: "No se ha podido crear la alergia", error: err });
    });
};

const updateAlergia = async (req, res) => {
  try {
    let resComment = await conx.updateAlergia(req.params.id);
    if (resComment != 0) {
      res.status(200).json(resComment);
    } else {
      res.status(400).json({ msg: "No se ha podido crear la alergia" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const destroyAlergia = async (req, res) => {
  try {
    let resComment = await conx.destroyAlergia(req.params.id_new);
    if (resComment != 0) {
      res.status(200).json(resComment);
    } else {
      res.status(400).json({ msg: "No se ha podido crear la alergia" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
}
  //------------------------Alergias_user---------------

  const saveOrUpdateAlergiasOfUser = async (req, res) => {
    try {
      let alergias = req.body.alergias
      let user = req.body.id_user
      
      let oldAlergias = await conx.deleteAlergiasOfUser(user);
      
      if(oldAlergias){
        let saveAlergias = 0

        alergias.forEach(async element => {
          saveAlergias = await conx.saveAlergiaOfUser(user, element.id);
        });

        if (saveAlergias != 0) {
          res.status(200).json(saveAlergias);
        } else {
          res.status(400).json({ msg: "No se ha podido crear la alergia" });
        }
      }
    } catch (err) {
      console.log(err)
      res.status(400).json({ error: err.message });
    }
  };

module.exports = {
  index,
  showAlergiasOfUser,
  showMyAlergias,
  createAlergia,
  updateAlergia,
  destroyAlergia,
  saveOrUpdateAlergiasOfUser
};
