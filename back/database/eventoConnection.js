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
            attributes: ['id', 'nombre', 'fecha', 'idCategoria']
        })
        
        let devolver = []

        for(let i=0;i < eventos.length;i++){
            
            devolver[i] = {}
            devolver[i].id = eventos[i].id
            //console.log('entra')
            devolver[i].nombre = eventos[i].nombre
            devolver[i].fecha = eventos[i].fecha
            let categoria = ''
            categoria = await models.Categoria.findByPk(eventos[i].idCategoria);

            devolver[i].Categoria = categoria.nombre;


        }
       
        
        conx.desconectar
        return devolver
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
            let nuevoEvento = await models.Evento.create(body)
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
            conx.desconectar();
            throw error;
        }
        console.log(resultado);
        await resultado.update(body);
        conx.desconectar();
    }

    deleteEvento = async(id) => {

        
        let resultado
        conx.conectar

        resultado = await models.Evento.findByPk(id)
        
        if (!resultado){
            console.log(id);
            conx.desconectar();
            throw error;
        }

        
        await resultado.destroy()
        console.log('es aqui')
        conx.desconectar();

        }
    }


    getParticipantes = async(idEvento) => {

        conx.conectar

        let resultado = await models.User.destroy({
            where: { idEvento: idEvento },
        });

        conx.desconectar
    }





module.exports = eventoConnection;