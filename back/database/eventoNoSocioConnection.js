require('dotenv').config()
const { Sequelize, Op } = require('sequelize');
const models = require('../models/index.js'); //Esto tiene acceso a todos los modelos.
const Conexion = require('../database/connection')
const conx = new Conexion()


class eventoNoSocioConnection{

    constructor() {}

    getEventosNoSocios = async() => {
           
        
        let eventosNoSocios = []
        conx.conectar
        
        eventosNoSocios = await models.EventoNoSocio.findAll({
            attributes: ['id', 'idNoSocio', 'idEvento']
        })
        
        conx.desconectar
        return eventosNoSocios
    }

    getEventoNoSocio = async() => {

        conx.conectar
        let eventoNoSocio = await models.EventoNoSocio.findByPk(id)

        conx.desconectar
        return eventoNoSocio

    }

    insertEventoNoSocio = async(idEvento,idNoSocio) => {
        
        let ids = {
            idNoSocio: idNoSocio,
            idEvento: idEvento
        };
        console.log(ids)
        conx.conectar
        try {
            
            let nuevoNoSocio = await models.EventoNoSocio.create(ids)
            
            console.log(ids)
            return ids
        } catch (error) {
            return error
        }finally{
            conx.desconectar
        }
    }

    updateEventoNoSocio = async(id,body) => {

        let resultado
        conx.conectar
        resultado = await models.EventoNoSocio.findByPk(id)
            
        if (!resultado){
            console.log(id);
            conx.desconectar();
            throw error;
        }
        console.log(resultado);
        await resultado.update(body);
        conx.desconectar();

    }

    deleteConIdNoSocio = async(idNoSocio) => {
        
        try {
            conx.conectar
            let resultado = await models.EventoNoSocio.destroy({
                where: { idNoSocio: idNoSocio },
            });

            return resultado;
        } catch (error) {
            return error;
        }finally{
            conx.desconectar
        }
    }

    deleteWithIdEvento = async(idEvento) => {
            
        try {
            conx.conectar
            let resultado = await models.EventoNoSocio.destroy({
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

module.exports = eventoNoSocioConnection;