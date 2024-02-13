require('dotenv').config();
const { Sequelize, Model } = require('sequelize');
const models = require('../models/index.js');
const conexion = require('./connection.js');

class ClaseHasUsuarioConnection {

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

    getClaseHasUsuario = async (id_usuario) => {
        let claseHasUsuario;
        let con = new conexion();
        try {
            await con.conectar();
            claseHasUsuario = await models.clase_has_usuario.findOne({
                where: {
                    id_usuario: id_usuario
                },
                raw: true
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