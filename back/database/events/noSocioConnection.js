// Gonzalo Martinez Haro
require('dotenv').config()
const { Sequelize, Op } = require('sequelize');
const models = require('../../models'); //Esto tiene acceso a todos los modelos.
const Conexion = require('../connection')
const conx = new Conexion()


class noSocioConnection{

    constructor() {}

    getNoSocios = async() => {

        let noSocios = []
        conx.conectar
        
        noSocios = await models.NoSocio.findAll({
            attributes: ['id', 'nombre', 'apellidos']
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