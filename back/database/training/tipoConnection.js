/**
 * @author Marina Laguna
 */
require('dotenv').config()
const { Sequelize } = require('sequelize');
const models = require('../../models');
const Conexion = require('../connection')
const conexion = new Conexion()

class tipoConnection {
    constructor() {}

    getTipos = async () => {
        let tipos = [];
        conexion.conectar();
        tipos = await models.Tipo.findAll({
            attributes: ['id', 'nombre', 'descripcion']
        });
        conexion.desconectar(); 
        return tipos;
    }
}

module.exports = tipoConnection;