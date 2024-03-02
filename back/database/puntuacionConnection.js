/**
 * @author: Marina Laguna
 */
require('dotenv').config()
const { Sequelize } = require('sequelize');
const models = require('../models/index.js');
const Conexion = require('../database/connection')
const conexion = new Conexion()

class puntuacionConnection{
    constructor() {}

    getSocios = async () => {
        try {
            conexion.conectar();
            const rolSocio = await models.Rol.findOne({
                where: { name: 'socio' } 
            });
    
            if (!rolSocio) {
                throw new Error('No se encontró el rol de socio');
            }
    
            const userRoles = await models.UserRol.findAll({
                where: { id_rol: rolSocio.id },
                include: [{
                    model: models.Users,
                    as: 'user', 
                    attributes: ['id', 'firstName'] 
                }]
            });
    
           const socios = userRoles.map(userRole => userRole.user); 
    
            conexion.desconectar();
            return socios;
        } catch (error) {
            console.error('Error al obtener los socios:', error);
            throw error;
        }
    };

    getpuntuaciones = async() => {
        let puntuaciones = [];
        conexion.conectar;
        
        puntuaciones = await models.Puntuacion.findAll({
            attributes: ['id', 'nota', 'idEntrenamiento']
        });
        conexion.desconectar;
        return puntuaciones;
    }

    getPuntuacionId = async(id) => {
        conexion.conectar;
        let puntuacion = await models.Puntuacion.findByPk(id);

        conexion.desconectar;
        return puntuacion;
    }

    insertPuntuacion = async(body) => {
        let resultado = 0;
        conexion.conectar;

        try {
            console.log(body);
            nuevaPuntuacion = await models.Puntuacion.create(body);
            resultado = 1;
            return resultado;
        } catch (error) {
            return error;
        }finally{
            conexion.desconectar;
        }
    }

    updatePuntuacion = async(id,body) => {
        let resultado;
        conexion.conectar;
        resultado = await models.Puntuacion.findByPk(id);
            
        if (!resultado){
            this.desconectar();
            throw error;
        }
        await resultado.update(body);
    }

    deletePuntuacion = async(id) => {
        let resultado;
        conexion.conectar;

        resultado = await models.Puntuacion.findByPk(id);

        if (!resultado){
            this.desconectar();
            throw error;
        }

        await resultado.destroy();
    }

    async getPuntuacionExistente(userId, idEntrenamiento) {
        try {
            const puntuacionExistente = await models.Puntuacion.findOne({
                where: {
                    userId: userId,
                    idEntrenamiento: idEntrenamiento
                }
            });

            return puntuacionExistente !== null;
        } catch (error) {
            console.error('Error al verificar la existencia de la puntuación:', error);
            throw error;
        }
    }
}

module.exports = puntuacionConnection;