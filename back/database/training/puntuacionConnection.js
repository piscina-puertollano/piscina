/**
 * @author Marina Laguna
 */
require('dotenv').config()
const { Sequelize } = require('sequelize');
const models = require('../../models');
const Conexion = require('../connection')
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
    
            const rolUsers = await models.UserRol.findAll({
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
    
            const socios = rolUsers.map(rolUser => {
                const socio = rolUser.user.get({ plain: true });
                socio.puntuacionesUsuario = rolUser.user.puntuacionesUsuario ? rolUser.user.puntuacionesUsuario.map(puntuacionUsuario => {
                    const { idPuntuacion } = puntuacionUsuario;
                    const puntuacion = puntuacionUsuario.puntuacion ? puntuacionUsuario.puntuacion.get({ plain: true }) : null;
                    return { idPuntuacion, ...puntuacion };
                }) : [];
                return socio;
            });
    
            conexion.desconectar();
            return socios;
        } catch (error) {
            throw error;
        }
    };

    getPuntuacionSocioId = async (socioId) => {
        try {
            conexion.conectar();
            const puntuacionUsuario = await models.PuntuacionUsuario.findOne({
                where: { id_user: socioId },
                include: [{
                    model: models.Puntuacion,
                    as: 'puntuacion',
                    attributes: ['id', 'nota', 'idEntrenamiento']
                }]
            });
            conexion.desconectar();
            return puntuacionUsuario;
        } catch (error){
            throw error;
        }
    }

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
            conexion.desconectar();
            throw error;
        }
    };

    insertPuntuacion = async(body) => {
        try {
            const nuevaPuntuacion = await models.Puntuacion.create(body);
            const idPuntuacion = nuevaPuntuacion.id;
    
            const relacionInsertada = await models.PuntuacionUsuario.create({
                id_user: body.userId,
                idPuntuacion: idPuntuacion
            });
    
            return { success: true, id: idPuntuacion, data: { nota: body.nota, userId: body.userId, idEntrenamiento: body.idEntrenamiento } };
        } catch (error) {
            return { success: false, error: 'Error al insertar la puntuación o la relación en la tabla puntuacionUsuario' };
        }
    };

    insertRelacionPuntuacionUsuario = async (userId, idPuntuacion) => {
        try {
            await models.PuntuacionUsuario.create({
                id_user: userId,
                idPuntuacion: idPuntuacion
            });
            return true;
        }catch (error){
            return false
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

    getPuntuacionExistente = async (userId, idEntrenamiento) => {
        try {
            const puntuacionExistente = await models.PuntuacionUsuario.findOne({
                where: {
                    id_user: userId,
                }
            });
    
            return puntuacionExistente !== null;
        } catch (error) {
            throw error;
        }
    }

    getTutorUsers = async (userId) => {
        try {
            const userRole = await models.UserRol.findOne({
                where: { id_user: userId },
                include: [{
                    model: models.Rol,
                    as: 'rol',
                    attributes: ['name']
                }]
            });
    
            if (!userRole || userRole.rol.name !== 'tutor') {
                throw new Error('El usuario no es un tutor.');
            }
    
            const tutorUsers = await models.TutorUser.findAll({
                where: { id_tutor: userId },
                attributes: ['id_socio']
            });
    
            const sociosIds = tutorUsers.map(tutorUser => tutorUser.id_socio);
    
            const socios = await models.Users.findAll({
                where: { id: sociosIds },
                attributes: ['id', 'firstName', 'lastName', 'email'] 
            });
    
            return socios;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = puntuacionConnection;