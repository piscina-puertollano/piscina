// Gonzalo Martinez Haro
require('dotenv').config()
const { Sequelize, Op } = require('sequelize');
const models = require('../../models'); //Esto tiene acceso a todos los modelos.
const Conexion = require('../connection')
const conx = new Conexion()



class categoriaConnection{

    constructor() {}
    

    getCategorias = async() => {

        let categorias = []
        conx.conectar
        
        categorias = await models.Categoria.findAll({
            attributes: ['id', 'nombre']
        })
        
        conx.desconectar
        return categorias
    }

    getCategoria = async(id) => {

        conx.conectar
        let categoria = await models.Categoria.findByPk(id)

        conx.desconectar
        return categoria
        
    }

    insertCategoria = async(body) => {

        let resultado = 0
        conx.conectar

        try {
            //console.log(body)
            let nuevaCategoria= await models.Categoria.create(body)
            resultado = 1
            return resultado
        } catch (error) {
            return error
        }finally{
            conx.desconectar
        }
    }


    updateCategoria = async(id,body) => {

        let resultado
        conx.conectar
        resultado = await models.Categoria.findByPk(id)
            
        if (!resultado){
            //console.log(id);
            conx.desconectar();
            throw error;
        }
        
        await resultado.update(body);
        conx.desconectar();
    }

    deleteCategoria = async(id) => {

        let resultado
        conx.conectar

        resultado = await models.Categoria.findByPk(id)

        if (!resultado){
            //console.log(id);
            conx.desconectar();
            throw error;
        }

        await resultado.destroy()
        conx.desconectar();

        }
    }





module.exports = categoriaConnection;