require('dotenv').config()
const { Sequelize, Op } = require('sequelize');
const models = require('../models/index.js'); //Esto tiene acceso a todos los modelos.
const Conexion = require('../database/connection')
const conx = new Conexion()


class eventoConnection{

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

    getEventos = async() => {

        let eventos = []
        conx.conectar
        
        eventos = await models.Evento.findAll({
            attributes: ['id', 'nombre']
        })
        console.log('entro')
        conx.desconectar
        return eventos
    }

    getEvento = async(id) => {

        conx.conectar
        let evento = await models.Evento.findByPk(id)

        conx.desconectar
        return evento
        
    }

    insertEvento = async(body) => {

        let resultado = 0
        conx.conectar

        try {
            console.log(body)
            nuevoEvento = await models.Evento.create(body)
            resultado = 1
            return resultado
        } catch (error) {
            return error
        }finally{
            conx.desconectar
        }
    }


    updateEvento = async(id,body) => {

        let resultado
        conx.conectar
        resultado = await models.Evento.findByPk(id)
            
        if (!resultado){
            console.log(id);
            this.desconectar();
            throw error;
        }
        console.log(resultado);
        await resultado.update(body);
    }

    deleteEvento = async(id) => {

        let resultado
        conx.conectar

        resultado = await models.Evento.findByPk(id)

        if (!resultado){
            console.log(id);
            this.desconectar();
            throw error;
        }

        console.log(resultado)
        await resultado.destroy()

        }
    }





module.exports = eventoConnection;