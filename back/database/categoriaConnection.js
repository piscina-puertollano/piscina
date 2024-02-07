require('dotenv').config()
const { Sequelize, Op } = require('sequelize');
const models = require('../models/index.js'); //Esto tiene acceso a todos los modelos.
const Conexion = require('../database/connection')
const conx = new Conexion()



class categoriaConnection{

    constructor() {
        this.db = new Sequelize(process.env.DB_DEV, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect:process.env.DB_DIALECT, /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
             },
          });
    }

    getCategorias = async() => {

        let categorias = []
        conx.conectar
        
        categorias = await models.Categoria.findAll({
            attributes: ['id', 'nombre']
        })
        
        conx.desconectar
        return categorias
    }

    getCategoria = async(id) => {

        conx.conectar
        let categoria = await models.Categoria.findByPk(id)

        conx.desconectar
        return categoria
        
    }

    insertCategoria = async(body) => {

        let resultado = 0
        conx.conectar

        try {
            console.log(body)
            let nuevaCategoria= await models.Categoria.create(body)
            resultado = 1
            return resultado
        } catch (error) {
            return error
        }finally{
            conx.desconectar
        }
    }


    updateCategoria = async(id,body) => {

        let resultado
        conx.conectar
        resultado = await models.Categoria.findByPk(id)
            
        if (!resultado){
            console.log(id);
            conx.desconectar();
            throw error;
        }
        console.log(resultado);
        await resultado.update(body);
        conx.desconectar();
    }

    deleteCategoria = async(id) => {

        let resultado
        conx.conectar

        resultado = await models.Categoria.findByPk(id)

        if (!resultado){
            console.log(id);
            conx.desconectar();
            throw error;
        }

        console.log(resultado)
        await resultado.destroy()
        conx.desconectar();

        }
    }





module.exports = categoriaConnection;