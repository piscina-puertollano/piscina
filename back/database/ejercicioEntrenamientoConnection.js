/**
 * @author: Marina Laguna
 */
require('dotenv').config()
const { Sequelize } = require('sequelize');
const models = require('../models/index.js');
const Conexion = require('./connection.js')
const conexion = new Conexion()

class ejercicioEntrenamientoConnection {
    constructor() {}

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
    
            const nuevoEntrenamiento = await models.Entrenamiento.create({
                nombre: body.nombre,
                descripcion: body.descripcion
            });
    
            const ejerciciosInsertados = [];
    
            for (const ejercicio of body.ejercicios) {
                const nuevoEjercicio = await models.Ejercicio.findOrCreate({
                    where: { descripcion: ejercicio.descripcion, idTipo: ejercicio.idTipo },
                    defaults: { descripcion: ejercicio.descripcion, idTipo: ejercicio.idTipo }
                });
    
                ejerciciosInsertados.push(nuevoEjercicio[0]); // Guarda el ejercicio creado o encontrado
            }
    
            const asociacionesEjercicios = ejerciciosInsertados.map(ejercicio => ({
                idEntrenamiento: nuevoEntrenamiento.id,
                idEjercicio: ejercicio.id
            }));
    
            await models.EjercicioEntrenamiento.bulkCreate(asociacionesEjercicios);
    
    
            resultado = 1;
            return resultado;
        } catch (error) {
            console.error('Error durante la inserción:', error);
            throw error;
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
            const entrenamiento = await models.Entrenamiento.findByPk(id, {
                include: [{
                    model: models.EjercicioEntrenamiento,
                    include: models.Ejercicio
                }],
            });

            console.log(entrenamiento)
    
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

module.exports = ejercicioEntrenamientoConnection;