/**
 * @author: Marina Laguna
 */
require('dotenv').config()
const { Sequelize } = require('sequelize');
const models = require('../models/index.js');
const Conexion = require('../database/connection')
const conexion = new Conexion()

class tipoConnection {
    constructor() {
        this.db = new Sequelize(process.env.DB_DEV, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
        });
    }

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