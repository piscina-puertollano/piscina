/**
 * @author: Marina Laguna
 */
require('dotenv').config()
const { Sequelize } = require('sequelize');
const models = require('../models/index.js');
const Conexion = require('../database/connection')
const conexion = new Conexion()

class puntuacionConnection{
    constructor() {
        this.db = new Sequelize(process.env.DB_DEV, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect:process.env.DB_DIALECT,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
             },
          });
    }

    getpuntuaciones = async() => {
        let puntuaciones = [];
        conexion.conectar;
        
        puntuaciones = await models.Puntuacion.findAll({
            attributes: ['id', 'nota', 'entrenamiento_id']
        });
        conexion.desconectar;
        return puntuaciones;
    }

    getPuntuacionId = async(id) => {
        conexion.conectar;
        let puntuacion = await models.Puntuacion.findByPk(id);

        conexion.desconectar;
        return puntuacion;
    }

    insertPuntuacion = async(body) => {
        let resultado = 0;
        conexion.conectar;

        try {
            console.log(body);
            nuevaPuntuacion = await models.Puntuacion.create(body);
            resultado = 1;
            return resultado;
        } catch (error) {
            return error;
        }finally{
            conexion.desconectar;
        }
    }

    updatePuntuacion = async(id,body) => {
        let resultado;
        conexion.conectar;
        resultado = await models.Puntuacion.findByPk(id);
            
        if (!resultado){
            this.desconectar();
            throw error;
        }
        await resultado.update(body);
    }

    deletePuntuacion = async(id) => {
        let resultado;
        conexion.conectar;

        resultado = await models.Puntuacion.findByPk(id);

        if (!resultado){
            this.desconectar();
            throw error;
        }

        await resultado.destroy();
    }

    async getPuntuacionExistente(userId, idEntrenamiento) {
        try {
            const puntuacionExistente = await models.Puntuacion.findOne({
                where: {
                    userId: userId,
                    idEntrenamiento: idEntrenamiento
                }
            });

            return puntuacionExistente !== null;
        } catch (error) {
            console.error('Error al verificar la existencia de la puntuación:', error);
            throw error;
        }
    }
}

module.exports = puntuacionConnection;