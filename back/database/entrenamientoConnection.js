/**
 * author: Marina Laguna
 */
require('dotenv').config()
const { Sequelize } = require('sequelize');
const models = require('../models/index.js');
const Conexion = require('../database/connection')
const conexion = new Conexion()

class entrenamientoConnection {
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
        conexion.conectar;

        entrenamientos = await models.Entrenamiento.findAll({
            attributes: ['id', 'idEjercicio', 'nombre', 'descripcion']
        });
        conexion.desconectar;
        return entrenamientos;
    }

    getEntrenamientoId = async (id) => {
        conexion.conectar;
        let entrenamiento = await models.Entrenamiento.findByPk(id);

        conexion.desconectar;
        return entrenamiento;
    }

    insertEntrenamiento = async (body) => {
        let resultado = 0;
        conexion.conectar;

        try {
            console.log(body);
            nuevoEntrenamiento = await models.Entrenamiento.create(body);
            resultado = 1;
            return resultado;
        } catch (error) {
            return error;
        } finally {
            conexion.desconectar;
        }
    }

    updateEntrenamiento = async (id, body) => {
        let resultado;
        conexion.conectar;
        resultado = await models.Entrenamiento.findByPk(id);

        if (!resultado) {
            conexion.desconectar;
            throw new Error('Entrenamiento no encontrado');
        }
        await resultado.update(body);
        conexion.desconectar;
    }

    deleteEntrenamiento = async (id) => {
        let resultado;
        conexion.conectar;

        resultado = await models.Entrenamiento.findByPk(id);

        if (!resultado) {
            conexion.desconectar;
            throw new Error('Entrenamiento no encontrado');
        }

        await resultado.destroy();
        conexion.desconectar;
    }
}

module.exports = entrenamientoConnection;
