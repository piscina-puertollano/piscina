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
            attributes: ['id', 'nombre', 'fecha', 'idCategoria', 'sede']
        })
        
        let devolver = []

        for(let i=0;i < eventos.length;i++){
            
            devolver[i] = {}
            devolver[i].id = eventos[i].id
            //console.log('entra')
            devolver[i].nombre = eventos[i].nombre
            devolver[i].fecha = eventos[i].fecha
            devolver[i].sede = eventos[i].sede
            let categoria = {}
            //categoria = await models.Categoria.findByPk(eventos[i].idCategoria);

            categoria = await models.Categoria.findOne({
                where: { id: { [Op.eq]: eventos[i].idCategoria } },
                include: [{
                    model: models.Evento,
                    as: 'eventos'
                  }]
                });

            devolver[i].categoria = categoria.nombre;


        }
       
        
        conx.desconectar
        return devolver
    }


    getEventosVisibles = async() => {

        
        
        let eventos = []
        conx.conectar
        
        eventos = await models.Evento.findAll({
            where: { visible: { [Op.eq]: true } },
            attributes: ['id', 'nombre', 'fecha', 'idCategoria', 'sede']
        })
        
        let devolver = []

        for(let i=0;i < eventos.length;i++){
            
            devolver[i] = {}
            devolver[i].id = eventos[i].id
            //console.log('entra')
            devolver[i].nombre = eventos[i].nombre
            devolver[i].fecha = eventos[i].fecha
            devolver[i].sede = eventos[i].sede
            let categoria = {}
            //categoria = await models.Categoria.findByPk(eventos[i].idCategoria);

            categoria = await models.Categoria.findOne({
                where: { id: { [Op.eq]: eventos[i].idCategoria } },
                include: [{
                    model: models.Evento,
                    as: 'eventos'
                  }]
                });
            devolver[i].categoria = categoria.nombre;


        }
       
        
        conx.desconectar
        return devolver
    }

    getEvento = async(id) => {

        conx.conectar
        
        let evento = await models.Evento.findByPk(id)

        //.raw

        let devolver = {}

        devolver.id = evento.id
        devolver.nombre = evento.nombre
        devolver.fecha = evento.fecha
        devolver.sede = evento.sede
        devolver.visible = evento.visible
        devolver.privado = evento.privado
        let categoria = ''
        
        categoria = await models.Categoria.findOne({
            where: { id: { [Op.eq]: evento.idCategoria } },
            include: [{
                model: models.Evento,
                as: 'eventos'
              }]
            });

        devolver.categoria = categoria.nombre;

        conx.desconectar
        return devolver

        
    }

    insertEvento = async(body) => {

        let resultado = 0
        conx.conectar

        
        let devolver = {}

        devolver.id = body.id
        devolver.nombre = body.nombre
        devolver.fecha = body.fecha
        devolver.sede = body.sede
        //Faltan las checkbox
        //devolver.visible = evento.visible
        //devolver.privado = evento.privado
        
        let categoria = ''

        categoria = await models.Categoria.findOne({
            where: { nombre: { [Op.eq]: body.categoria } },
            include: [{
                model: models.Evento,
                as: 'eventos'
              }]
            });

        devolver.idCategoria = categoria.id;
            
        try {
            let nuevoEvento = await models.Evento.create(devolver)
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

        let devolver = {}

        devolver.id = body.id
        devolver.nombre = body.nombre
        devolver.fecha = body.fecha
        devolver.sede = body.sede
        devolver.visible = body.visible
        devolver.privado = body.privado
        let categoria = ''

        categoria = await models.Categoria.findOne({
            where: { nombre: { [Op.eq]: body.categoria } },
            include: [{
                model: models.Evento,
                as: 'eventos'
              }]
            });

        devolver.idCategoria = categoria.id;
        
        await resultado.update(devolver);
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
        conx.desconectar();

        }


    deleteConIdCategoria = async(idCategoria) => {
    
        try {
            
            conx.conectar
            let resultado = await models.Evento.destroy({
                where: { idCategoria: idCategoria },
            });
            
            return resultado;
        } catch (error) {
            return error;
        }finally{
            conx.desconectar
        }

    }
    }


    





module.exports = eventoConnection;