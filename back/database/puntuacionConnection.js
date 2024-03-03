/**
 * @author Marina Laguna
 */
require('dotenv').config()
const { Sequelize } = require('sequelize');
const models = require('../models/index.js');
const Conexion = require('../database/connection')
const conexion = new Conexion()

class puntuacionConnection{
    constructor() {}

    /* getSocios = async () => {
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
                    attributes: ['id', 'firstName', 'lastname', 'photo_profile'] 
                }]
            });
    
           const socios = userRoles.map(userRole => userRole.user); 
    
            conexion.desconectar();
            return socios;
        } catch (error) {
            console.error('Error al obtener los socios:', error);
            throw error;
        }
    }; */

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
                    attributes: ['id', 'firstName', 'lastname', 'photo_profile'],
                    include: [{
                        model: models.PuntuacionUsuario,
                        as: 'puntuacionesUsuario',
                        attributes: ['idPuntuacion'],
                        required: false,
                        include: [{
                            model: models.Puntuacion,
                            as: 'puntuacion',
                            attributes: ['id', 'nota'],
                            required: false,
                        }]
                    }]
                }]
            });
    
            const socios = userRoles.map(userRole => {
                const socio = userRole.user.get({ plain: true });
                socio.puntuacionesUsuario = userRole.user.puntuacionesUsuario ? userRole.user.puntuacionesUsuario.map(puntuacionUsuario => {
                    const { idPuntuacion } = puntuacionUsuario;
                    const puntuacion = puntuacionUsuario.puntuacion ? puntuacionUsuario.puntuacion.get({ plain: true }) : null;
                    return { idPuntuacion, ...puntuacion };
                }) : [];
                return socio;
            });
    
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
        try {
            conexion.conectar();
            const puntuacionUsuario = await models.PuntuacionUsuario.findOne({
                where: { id_user: id },
                include: [{
                    model: models.Puntuacion,
                    as: 'puntuacion',
                    attributes: ['id', 'nota']
                }]
            });
    
            if (puntuacionUsuario && puntuacionUsuario.puntuacion) {
                const puntuacion = puntuacionUsuario.puntuacion.get({ plain: true });
                conexion.desconectar();
                return puntuacion;
            } else {
                conexion.desconectar();
                return null;
            }
        } catch (error) {
            console.error('Error al obtener la puntuación:', error);
            conexion.desconectar();
            throw error;
        }
    };

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