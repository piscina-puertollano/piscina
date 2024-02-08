require('dotenv').config()
const { Sequelize, Op } = require('sequelize');
const models = require('../models/index.js'); //Esto tiene acceso a todos los modelos.
const Conexion = require('../database/connection')
const conx = new Conexion()



class eventoUsuarioConnection{

    constructor() {}

    getEventosUsuarios = async() => {
           
        
        let eventosUsuarios = []
        conx.conectar
        
        eventosUsuarios = await models.EventoUsuario.findAll({
            attributes: ['id', 'idUsuario', 'idEvento']
        })
        
        conx.desconectar
        return eventosUsuarios
    }

    getEventoUsuario = async() => {

        conx.conectar
        let eventoUsuario = await models.EventoUsuario.findByPk(id)

        conx.desconectar
        return eventoUsuario

    }

    insertEventoUsuario = async(body) =>{

        let resultado
        conx.conectar

        try {
            console.log(body)
            resultado = await models.EventoUsuario.create(body)
        } catch (error) {
            throw error
        }finally {
            conx.desconectar()
        }
        return resultado
    }

    updateEventoUsuario = async(id,body) => {

        let resultado
        conx.conectar
        resultado = await models.EventoUsuario.findByPk(id)
            
        if (!resultado){
            console.log(id);
            conx.desconectar();
            throw error;
        }
        console.log(resultado);
        await resultado.update(body);
        conx.desconectar();

    }
    deleteConIdUsuario = async(idUsuario) => {
        
        try {
            conx.desconectar
            let resultado = await models.EventoUsuario.destroy({
                where: { idUsuario: idUsuario },
            });

            return resultado;
        } catch (error) {
            return error;
        }finally{
            conx.desconectar
        }

    }

    deleteConIdEvento = async(idEvento) => {
        
        try {
            
            conx.conectar
            let resultado = await models.EventoUsuario.destroy({
                where: { idEvento: idEvento },
            });
            
            return resultado;
        } catch (error) {
            return error;
        }finally{
            conx.desconectar
        }

    }


        

}

module.exports = eventoUsuarioConnection;