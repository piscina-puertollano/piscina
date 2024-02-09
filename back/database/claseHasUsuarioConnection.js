require('dotenv').config();
const { Sequelize, Model } = require('sequelize');
const models = require('../models/index.js');
const conexion = require('./connection.js');

class ClaseHasUsuarioConnection {

    constructor() {
        this.db = new Sequelize(process.env.DB_DEV, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            pool: {
                max:   5,
                min:   0,
                acquire:   30000,
                idle:   10000
            },
        });
    }

    getClasesHasUsuarios = async () => {
        let clasesHasUsuarios = [];
        try {
            let con = new conexion();
            await con.conectar();
            clasesHasUsuarios = await models.clase_has_usuario.findAll();
            await con.desconectar();
        } catch (error) {
            console.error('Error en getClasesHasUsuarios:', error);
            throw error;
        }
        return clasesHasUsuarios;
    };

    getClaseHasUsuario = async (usuario_idusuario, clase_idclase) => {
        let claseHasUsuario;
        let con = new conexion();
        try {
            await con.conectar();
            claseHasUsuario = await models.clase_has_usuario.findOne({
                where: {
                  usuario_idusuario: usuario_idusuario,
                  clase_idclase: clase_idclase
                }
            });
            await con.desconectar();
        } catch (error) {
            console.error('Error en getClaseHasUsuario:', error);
            throw error;
        }
        return claseHasUsuario;
    };

    insertClaseHasUsuario = async (data) => {
        let resultado =   0;
        let con = new conexion();
        try {
            await con.conectar();
            const nuevoClaseHasUsuario = await models.clase_has_usuario.create(data);
            resultado =   1;
            await con.desconectar();
        } catch (error) {
            console.error('Error en insertClaseHasUsuario:', error);
        }
        return resultado;
    };

    updateClaseHasUsuario = async (id, data) => {
        let con = new conexion();
        try {
            await con.conectar();
            const claseHasUsuario = await models.clase_has_usuario.findByPk(id);
            if (!claseHasUsuario) {
                console.error(`ClaseHasUsuario with id ${id} not found.`);
                throw new Error(`ClaseHasUsuario with id ${id} not found.`);
            }
            await claseHasUsuario.update(data);
            await con.desconectar();
        } catch (error) {
            console.error('Error en updateClaseHasUsuario:', error);
            throw error;
        }
    };

    deleteClaseHasUsuario = async (id) => {
        let con = new conexion();
        try {
            await con.conectar();
            const claseHasUsuario = await models.clase_has_usuario.findByPk(id);
            if (!claseHasUsuario) {
                console.error(`ClaseHasUsuario with id ${id} not found.`);
                throw new Error(`ClaseHasUsuario with id ${id} not found.`);
            }
            await claseHasUsuario.destroy();
            await con.desconectar();
        } catch (error) {
            console.error('Error en deleteClaseHasUsuario:', error);
            throw error;
        }
    };
}

module.exports = ClaseHasUsuarioConnection;
