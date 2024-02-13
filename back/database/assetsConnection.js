require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const models = require("../models/index.js");
const Conexion = require("./connection.js");

const conexion = new Conexion();

class AssetsModel {
  constructor() {}

  getAssetById=async(assetId)=>{
    let resultado = [];
    try{
        conexion.conectar();
        resultado = await models.Assets.findOne({
            attributes:["ruta"],
            where: {
                id: assetId,
            },
        });
        conexion.desconectar();
        if (!resultado) {
            throw new Error("Asset not found");
          }
    }catch(error){
        throw error
    }finally{
        return resultado;
    }

  }

  getAssetsOfUser = async (userId) => {
    let resultado = [];
    try{

        conexion.conectar();
        resultado = await models.UserAssets.findAll({
            attributes:['id_user'],
            where: {
                id_user: userId,
            },
            include: [
                {
                  model: models.Assets,
                  attributes: ["id", "ruta"],
                },
              ]
            
        });
        conexion.desconectar();
        if (!resultado) {
            throw new Error("user not found");
          }
    }catch(error){
        throw error
    }finally{
        return resultado;
    }

  };

  saveAssetOfUser = async (userId, assetId) =>{
    let resultado = [];
    try{

        conexion.conectar();
        resultado = await models.UserAssets.create(
            {
                id_user:userId,
                id_asset: assetId,
            }
            );
        conexion.desconectar();
        if (!resultado) {
            throw new Error("user not found");
          }
    }catch(error){
        throw error
    }finally{
        return resultado;
    }
  }
}

module.exports = AssetsModel;
