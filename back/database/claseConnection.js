require('dotenv').config();
const { Sequelize, Model } = require('sequelize');
const models = require('../models/index.js')
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
            let con = new conexion();
            con.conectar()
            clases = await models.clase.findAll();
            con.desconectar();
        } catch (error) {
            console.error('Error en getClases:', error); // Agrega esta línea para registrar el error
            throw error; // Asegúrate de volver a lanzar el error
        }
        return clases;
    };
    

    getClase = async (id) => {
        let clase;
        let con = new conexion();
        try {
            await con.conectar();
            clase = await models.clase.findByPk(id);
        } catch (error) {
            console.error('Error en getClase:', error);
            throw error;
        } finally {
            await con.desconectar();
        }
        return clase;
    };
    

    insertClase = async (data) => {
        let resultado =  0;
        let con = new conexion();
        try {
            await con.conectar();
            const nuevaClase = await models.clase.create(data);
            resultado =  1;
        } catch (error) {
            console.error('Error en insertClase:', error);
        } finally {
            await con.desconectar();
        }
        return resultado;
    };
    

    updateClase = async (id, data) => {
        let con = new conexion();
        try {
            await con.conectar();
            const clase = await models.clase.findByPk(id);
            if (!clase) {
                console.error(`Clase with id ${id} not found.`);
                throw new Error(`Clase with id ${id} not found.`);
            }
            await clase.update(data);
        } catch (error) {
            console.error('Error en updateClase:', error);
            throw error;
        } finally {
            await con.desconectar();
        }
    };
    

    deleteClase = async (id) => {
        let con = new conexion();
        try {
            await con.conectar();
            const clase = await models.clase.findByPk(id);
            if (!clase) {
                console.error(`Clase with id ${id} not found.`);
                throw new Error(`Clase with id ${id} not found.`);
            }
            await clase.destroy();
        } catch (error) {
            console.error('Error en deleteClase:', error);
            throw error;
        } finally {
            await con.desconectar();
        }
    };
    
}

module.exports = ClaseConnection;