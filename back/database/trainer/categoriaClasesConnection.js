require('dotenv').config();
const { Sequelize, Model } = require('sequelize');
const models = require('../../models');
const conexion = require('../connection.js');

class CategoriaClaseConnection {
    getCategorias = async () => {
        let categoriasClase = [];
        try {
            let con = new conexion();
            await con.conectar();
            categoriasClase = await models.categoria_clase.findAll();
            await con.desconectar();
        } catch (error) {
            console.error('Error en getCategorias:', error);
            throw error;
        }
        return categoriasClase;
    };
   
    getCategoria = async (id) => {
        let categoriasClase;
        let con = new conexion();
        try {
            await con.conectar();
            categoriasClase = await models.categoria_clase.findByPk(id);
            await con.desconectar();
        } catch (error) {
            console.error('Error en getCategoria:', error);
            throw error;
        }
        return categoriasClase;
    };
    
    insertCategoriasClase = async (data) => {
        let resultado = 0;
        let con = new conexion();
        try {
            await con.conectar();
            const nuevaCategoria = await models.categoria_clase.create(data);
            resultado = 1;
            await con.desconectar();
        } catch (error) {
            console.error('Error en insertCategoriasClase:', error);
        }
        return resultado;
    };
    
    updateCategoriasClase = async (id, data) => {
        let con = new conexion();
        try {
            await con.conectar();
            const categoriasClase = await models.categoria_clase.findByPk(id);
            if (!categoriasClase) {
                console.error(`Categoría con el id ${id} no encontrada.`);
                throw new Error(`Categoría con el id ${id} no encontrada.`);
            }
            await categoriasClase.update(data);
            await con.desconectar();
        } catch (error) {
            console.error('Error en updateCategoriasClase:', error);
            throw error;
        }
    };
    
    deleteCategoriasClase = async (id) => {
        let con = new conexion();
        try {
            await con.conectar();
            const categoriasClase = await models.categoria_clase.findByPk(id);
            if (!categoriasClase) {
                console.error(`Categoría con id ${id} no encontrada.`);
                throw new Error(`Categoría con id ${id} no encontrada.`);
            }
            await categoriasClase.destroy();
            await con.desconectar();
        } catch (error) {
            console.error('Error en deleteCategoriasClase:', error);
            throw error;
        }
    };
}

module.exports = CategoriaClaseConnection;
