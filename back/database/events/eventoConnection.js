// Gonzalo Martinez Haro
require('dotenv').config()
const { Sequelize, Op } = require('sequelize');
const models = require('../../models'); //Esto tiene acceso a todos los modelos.
const Conexion = require('../connection');
const users = require('../../models/users');
const conx = new Conexion()


class eventoConnection{

    constructor() {}

    getEventos = async() => {

        let eventos = []
        conx.conectar()
        
        eventos = await models.Evento.findAll({
            attributes: ['id', 'nombre', 'fecha', 'sede', 'privado', 'desc','visible'],
            include: [
                {
                  model: models.Assets,
                  as: "pdf",
                  attributes: ["ruta"]
                },
                {
                    model: models.Categoria,
                    as: "categoria",
                    attributes: ["id","nombre"]
                  },
                
            ]
        })    
        
        conx.desconectar
        return eventos
    }


    getEventosVisibles = async() => {

        let eventos = []
        conx.conectar()
        
        eventos = await models.Evento.findAll({
            where: { visible: { [Op.eq]: true } },
            attributes: ['id', 'nombre', 'fecha', 'idCategoria', 'sede','privado','desc'],
            include: [
                {
                  model: models.Assets,
                  as: "pdf",
                  attributes: ["ruta"]
                },
                {
                    model: models.Categoria,
                    as: "categoria",
                    attributes: ["id","nombre"]
                  },
                
            ]
        })
       
        conx.desconectar()
        return eventos
    }

    getEvento = async(id) => {

        conx.conectar()

        
        //let evento = await models.Evento.findByPk(id)


        let evento = await models.Evento.findAll({
            where: { id: { [Op.eq]: id } },
            attributes: ['id', 'nombre', 'fecha', 'idCategoria', 'sede','privado','desc','visible'],
            include: [
                {
                  model: models.Assets,
                  as: "pdf",
                  attributes: ["ruta"]
                },
                {
                    model: models.Categoria,
                    as: "categoria",
                    attributes: ["id","nombre"]
                  },
                
            ]
        })
       

        conx.desconectar()
        return evento
    }

    insertEvento = async(body) => {

        let resultado = 0
        conx.conectar()

        
        let devolver = {}

        devolver.id = body.id
        devolver.nombre = body.nombre
        devolver.fecha = body.fecha
        devolver.sede = body.sede
        devolver.desc = body.desc
        devolver.idCategoria = body.categoria.id
        devolver.visible = body.visible
        devolver.privado = body.privado
        
        
            
        try {
            let nuevoEvento = await models.Evento.create(devolver)
            resultado = 1
            return resultado
        } catch (error) {
            return error
        }finally{
            conx.desconectar()
        }
    }


    updateEvento = async(id,body) => {
        
        conx.conectar()
        let resultado
        resultado = await models.Evento.findByPk(id)
        console.log(resultado)

        let devolver = {}

        devolver.id = body.id
        devolver.nombre = body.nombre
        devolver.fecha = body.fecha
        devolver.sede = body.sede
        devolver.desc = body.desc
        
        devolver.idCategoria = body.categoria.id
        devolver.visible = body.visible
        devolver.privado = body.privado
        
        
        
        await resultado.update(devolver);
        conx.desconectar();
    }

    deleteEvento = async(id) => {

        
        let resultado
        conx.conectar()

        resultado = await models.Evento.findByPk(id)
        
        if (!resultado){
            console.log(id);
            conx.desconectar();
            throw error;
        }

        
        await resultado.destroy()
        conx.desconectar();

        }


    deleteConIdCategoria = async(idCategoria) => {
    
        try {
            
            conx.conectar();
            let resultado = await models.Evento.destroy({
                where: { idCategoria: idCategoria },
            });
            
            return resultado;
        } catch (error) {
            return error;
        }finally{
            conx.desconectar();
        }

    }

    
}





module.exports = eventoConnection;