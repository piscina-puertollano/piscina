// Gonzalo Martinez Haro
require('dotenv').config()
const { Sequelize, Op } = require('sequelize');
const models = require('../../models'); //Esto tiene acceso a todos los modelos.
const Conexion = require('../connection')
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

            let eventosUsuarios = await models.EventoUsuario.findAll()

            for(let i=0; i<eventosUsuarios.length;i++){

                if(eventosUsuarios[i].idUsuario == body.idUsuario && eventosUsuarios[i].idEvento == body.idEvento){
                    return 'ya esta inscrito'
                }
            }



            //console.log(body)
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
            //console.log(id);
            conx.desconectar();
            throw error;
        }
        //console.log(resultado);
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

    getUsuariosConIdEvento = async(idEvento) => {

        try {
            conx.conectar();
            const eventosUsuarios = await models.EventoUsuario.findAll({
                where:{ idEvento},
                include:[{
                    model: models.Users,
                    as: 'usuario',
                    attributes: ['firstName','lastName','email']
                }]
            });

            const usuarios = eventosUsuarios.map(eventoUsuario => eventoUsuario.usuario);
           
            return usuarios;
        } catch (error) {
        console.error('Error al obtener usuarios por evento:', error);
        throw error;
        }
    }


        

}

module.exports = eventoUsuarioConnection;