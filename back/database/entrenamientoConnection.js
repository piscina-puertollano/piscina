/**
 * author: Marina Laguna
 */
require('dotenv').config()
const { Sequelize } = require('sequelize');
const models = require('../models/index.js');
const Conexion = require('../database/connection')
const conexion = new Conexion()

class entrenamientoConnection {
    constructor() {
        this.db = new Sequelize(process.env.DB_DEV, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
        });
    }

    getEntrenamientos = async () => {
        let entrenamientos = [];
        try {
            conexion.conectar();
            entrenamientos = await models.Entrenamiento.findAll({
                attributes: ['id', 'nombre', 'descripcion'],
                include: [{
                    model: models.EjercicioEntrenamiento,
                    attributes: ['idEjercicio'],
                    include: [{
                        model: models.Ejercicio,
                        attributes: ['idTipo', 'descripcion'],
                        include: [{
                            model: models.Tipo, 
                            attributes: ['nombre'],
                        }]
                    }]
                }]
            });
            conexion.desconectar();
            return entrenamientos;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getEntrenamientoId = async (id) => {
        try {
            conexion.conectar();
            const entrenamiento = await models.Entrenamiento.findByPk(id, {
                attributes: ['id', 'nombre', 'descripcion'],
                include: [{
                    model: models.EjercicioEntrenamiento,
                    attributes: ['idEjercicio'],
                    include: [{
                        model: models.Ejercicio,
                        attributes: ['idTipo', 'descripcion'],
                        include: [{
                            model: models.Tipo,
                            attributes: ['nombre'],
                        }]
                    }]
                }]
            });
            conexion.desconectar();    
            return entrenamiento;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    insertEntrenamiento = async (body) => {
        let resultado = 0;
        try {
            conexion.conectar();
    
            const ejerciciosInsertados = [];
    
            for (const ejercicio of body.ejercicios) {
                const nuevoEjercicio = await models.Ejercicio.create({
                    descripcion: ejercicio.descripcion,
                    idTipo: ejercicio.idTipo
                });
    
                ejerciciosInsertados.push(nuevoEjercicio);
            }
    
            const nuevoEntrenamiento = await models.Entrenamiento.create({
                nombre: body.nombre,
                descripcion: body.descripcion
            });
    
            const asociacionesEjercicios = ejerciciosInsertados.map(ejercicio => ({
                idEntrenamiento: nuevoEntrenamiento.id,
                idEjercicio: ejercicio.id
            }));
    
            await models.EjercicioEntrenamiento.bulkCreate(asociacionesEjercicios);
    
            resultado = 1;
            return resultado;
        } catch (error) {
            return error;
        } finally {
            conexion.desconectar();
        }
    };  

    updateEntrenamiento = async (id, body) => {
        try {
            console.log('Conectando a la base de datos...');
            conexion.conectar();

            const entrenamiento = await models.Entrenamiento.findByPk(id);

            if (!entrenamiento) {
                throw new Error('Entrenamiento no encontrado');
            }

            await entrenamiento.update({
                nombre: body.nombre,
                descripcion: body.descripcion,
            });

            for (const ejercicio of body.ejercicios) {
                await models.Ejercicio.update(
                    {
                        descripcion: ejercicio.descripcion,
                        idTipo: ejercicio.idTipo,
                    },
                    {
                        where: {
                            id: ejercicio.id,
                        },
                    }
                );
            }
            console.log('Entrenamiento y ejercicios actualizados exitosamente.');
            return 'Éxito';
        } catch (error) {
            console.error('Error al actualizar entrenamiento y ejercicios:', error);
            return error;
        } finally {
            console.log('Desconectando de la base de datos...');
            conexion.desconectar();
        }
    };
        
    deleteEntrenamiento = async (id) => {
        try {
            // Buscar el entrenamiento con los ejercicios asociados
            const entrenamiento = await models.Entrenamiento.findByPk(id, {
                include: models.EjercicioEntrenamiento,
            });
    
            if (!entrenamiento) {
                console.log('Entrenamiento no encontrado.');
                return;
            }
    
            await models.EjercicioEntrenamiento.destroy({
                where: {
                    idEntrenamiento: id,
                },
            });
    
            await entrenamiento.destroy();
    
            console.log('Entrenamiento y ejercicios eliminados exitosamente.');
        } catch (error) {
            console.error('Error al eliminar entrenamiento y ejercicios:', error);
        }
    };
}

module.exports = entrenamientoConnection;