require('dotenv').config();
const { Sequelize, Model } = require('sequelize');
const models = require('../models/index.js');
const conexion = require('./connection.js');

class FaltasConnection {

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

    getFaltas = async () => {
        let faltas = [];
        try {
            let con = new conexion();
            await con.conectar();
            faltas = await models.faltas.findAll();
            await con.desconectar();
        } catch (error) {
            console.error('Error en getFaltas:', error);
            throw error;
        }
        return faltas;
    };

    getFalta = async (id) => {
        let falta;
        let con = new conexion();
        try {
            await con.conectar();
            falta = await models.faltas.findByPk(id);
            await con.desconectar();
        } catch (error) {
            console.error('Error en getFalta:', error);
            throw error;
        }
        return falta;
    };

    insertFalta = async (data) => {
        let resultado =  0;
        let con = new conexion();
        try {
            await con.conectar();
            const nuevaFalta = await models.faltas.create(data);
            resultado =  1;
            await con.desconectar();
        } catch (error) {
            console.error('Error en insertFalta:', error);
        }
        return resultado;
    };

    updateFalta = async (id, data) => {
        let con = new conexion();
        try {
            await con.conectar();
            const falta = await models.faltas.findByPk(id);
            if (!falta) {
                console.error(`Falta with id ${id} not found.`);
                throw new Error(`Falta with id ${id} not found.`);
            }
            await falta.update(data);
            await con.desconectar();
        } catch (error) {
            console.error('Error en updateFalta:', error);
            throw error;
        }
    };

    deleteFalta = async (id) => {
        let con = new conexion();
        try {
            await con.conectar();
            const falta = await models.faltas.findByPk(id);
            if (!falta) {
                console.error(`Falta with id ${id} not found.`);
                throw new Error(`Falta with id ${id} not found.`);
            }
            await falta.destroy();
            await con.desconectar();
        } catch (error) {
            console.error('Error en deleteFalta:', error);
            throw error;
        }
    };
}

module.exports = FaltasConnection;
