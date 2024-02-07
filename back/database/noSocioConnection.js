require('dotenv').config()
const { Sequelize, Op } = require('sequelize');
const models = require('../models/index.js'); //Esto tiene acceso a todos los modelos.
const Conexion = require('../database/connection')
const conx = new Conexion()


class noSocioConnection{

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

    getNoSocios = async() => {

        let noSocios = []
        conx.conectar
        
        noSocios = await models.NoSocio.findAll({
            attributes: ['id', 'nombre']
        })
        conx.desconectar
        return noSocios
    }

    getNoSocio = async(id) => {

        conx.conectar
        let noSocio = await models.NoSocio.findByPk(id)

        conx.desconectar
        return noSocio
        
    }

    insertNoSocio = async(body) => {

        let resultado = 0
        conx.conectar

        try {
            
            let noSocios = await models.NoSocio.findAll()

            for(let i=0; i<noSocios.length;i++){

                if(noSocios[i].nombre == body.nombre && noSocios[i].apellidos == body.apellidos && noSocios[i].email == body.email){
                    return noSocios[i].id
                }
            }
            
            let nuevoNoSocio = await models.NoSocio.create(body)
            resultado = nuevoNoSocio.id
            return resultado
        } catch (error) {
            return error
        }finally{
            conx.desconectar
        }
    }


    updateNoSocio = async(id,body) => {

        let resultado = 0
        conx.conectar
        resultado = await models.NoSocio.findByPk(id)
            
        if (!resultado){
            console.log(id);
            conx.desconectar
            throw error;
        }
        conx.desconectar
        await resultado.update(body);
    }

    deleteNoSocio = async(id) => {

        let resultado
        conx.conectar

        resultado = await models.NoSocio.findByPk(id)

        if (!resultado){
            console.log(id);
            conx.desconectar
            throw error;
        }

        conx.desconectar
        await resultado.destroy()

        }
    }





module.exports = noSocioConnection;