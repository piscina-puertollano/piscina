const { response, request } = require("express");
const Conexion = require("../database/assetsConnection");

const showAssetsUser = (req, res = response) => {
  const conx = new Conexion();

  conx.getAssetsOfUser(req.params.id)
    .then((msg) => {
      res.status(200).json(msg);
    })
    .catch((err) => {
      res.status(404).json({ msg: "User have not assets" });
    });
};

const showAsset = (req, res = response) => {
  const conx = new Conexion();

  conx.getAssetById(req.params.id)
    .then((msg) => {
      res.status(200).json(msg);
    })
    .catch((err) => {
      res.status(404).json({ msg: "User have not assets" });
    });
};

module.exports = {
    showAssetsUser,
    showAsset
};
