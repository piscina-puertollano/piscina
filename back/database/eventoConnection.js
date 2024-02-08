require('dotenv').config()
const { Sequelize, Op } = require('sequelize');
const models = require('../models/index.js'); //Esto tiene acceso a todos los modelos.
const Conexion = require('../database/connection')
const conx = new Conexion()


class eventoConnection{

    constructor() {}

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


    





module.exports = eventoConnection;