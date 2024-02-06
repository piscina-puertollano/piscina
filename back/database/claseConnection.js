require('dotenv').config();
const { Sequelize, Model } = require('sequelize');
const Clase = require('../models/clase.js'); 
const conexion = require('./connection.js');

class ClaseConnection {

    constructor() {
        this.db = new Sequelize(process.env.DB_DEV, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            pool: {
                max:  5,
                min:  0,
                acquire:  30000,
                idle:  10000
            },
        });
    }

    getClases = async () => {
        let clases = [];
        try {
            await conexion.conectar();
            clases = await Clase.findAll({
                attributes: ['idclase']
            });
            await conexion.desconectar();
        } catch (error) {
            console.error('Error en getClases:', error); // Agrega esta línea para registrar el error
            throw error; // Asegúrate de volver a lanzar el error
        }
        return clases;
    };
    

    getClase = async (id) => {
        await conexion.conectar();
        const clase = await Clase.findByPk(id);
        await conexion.desconectar();
        return clase;
    };

    insertClase = async (data) => {
        let resultado =  0;
        await conexion.conectar();
        try {
            const nuevaClase = await Clase.create(data);
            resultado =  1;
        } catch (error) {
            console.error(error);
        } finally {
            await conexion.desconectar();
        }
        return resultado;
    };

    updateClase = async (id, data) => {
        await conexion.conectar();
        const clase = await Clase.findByPk(id);
        if (!clase) {
            console.error(`Clase with id ${id} not found.`);
            await conexion.desconectar();
            throw new Error(`Clase with id ${id} not found.`);
        }
        await clase.update(data);
        await conexion.desconectar();
    };

    deleteClase = async (id) => {
        await conexion.conectar();
        const clase = await Clase.findByPk(id);
        if (!clase) {
            console.error(`Clase with id ${id} not found.`);
            await conexion.desconectar();
            throw new Error(`Clase with id ${id} not found.`);
        }
        await clase.destroy();
        await conexion.desconectar();
    };
}

module.exports = ClaseConnection;
