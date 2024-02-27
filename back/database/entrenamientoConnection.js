/**
 * author: Marina Laguna
 */
require('dotenv').config()
const { Sequelize } = require('sequelize');
const models = require('../models/index.js');
const Conexion = require('./connection.js')
const conexion = new Conexion()

class entrenamientoConnection{
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

    getEntrenamientos = async () => {
        let entrenamientos = [];
        try {
            conexion.conectar();
            entrenamientos = await models.Entrenamiento.findAll({
                attributes: ['id', 'nombre', 'descripcion'],
                include: [{
                    model: models.EjercicioEntrenamiento,
                    attributes: ['idEjercicio'],
                    include: [{
                        model: models.Ejercicio,
                        attributes: ['idTipo', 'descripcion'],
                        include: [{
                            model: models.Tipo, 
                            attributes: ['nombre'],
                        }]
                    }]
                }]
            });
            conexion.desconectar();
            return entrenamientos;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = entrenamientoConnection;