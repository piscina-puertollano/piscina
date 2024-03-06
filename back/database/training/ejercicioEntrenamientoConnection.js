/**
 * @author Marina Laguna
 */
require('dotenv').config()
const { Sequelize } = require('sequelize');
const models = require('../../models');
const Conexion = require('../connection.js')
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
                    attributes: ['ejercicioId'],
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
                    attributes: ['ejercicioId'],
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
            throw error;
        }
    }

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
    
                ejerciciosInsertados.push(nuevoEjercicio[0]);
            }
    
            const asociacionesEjercicios = ejerciciosInsertados.map(ejercicio => ({
                idEntrenamiento: nuevoEntrenamiento.id,
                ejercicioId: ejercicio.id
            }));
    
            await models.EjercicioEntrenamiento.bulkCreate(asociacionesEjercicios);
    
    
            resultado = 1;
            return resultado;
        } catch (error) {
            throw error;
        } finally {
            conexion.desconectar();
        }
    };

    updateEntrenamiento = async (id, body) => {
        try {
            conexion.conectar();
    
            const entrenamiento = await models.Entrenamiento.findByPk(id);
    
            if (!entrenamiento) {
                throw new Error('Entrenamiento no encontrado');
            }
    
            await entrenamiento.update({
                nombre: body.nombre,
                descripcion: body.descripcion,
            });
        
            if (Array.isArray(body.EjercicioEntrenamientos)) {
                for (const ejercicioEntrenamiento of body.EjercicioEntrenamientos) {
                    const ejercicioId = ejercicioEntrenamiento.ejercicioId;
                    const descripcion = ejercicioEntrenamiento.Ejercicio.descripcion;
                    const idTipo = ejercicioEntrenamiento.Ejercicio.idTipo;
    
                    if (ejercicioId && descripcion) {
                        await models.Ejercicio.update(
                            {
                                descripcion: descripcion,
                                idTipo: idTipo,
                            },
                            {
                                where: {
                                    id: ejercicioId,
                                },
                            }
                        );
                    }
                }
            } 
            return 'Éxito';
        } catch (error) {
            return error;
        } finally {
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

    
            if (!entrenamiento) {
                return;
            }
    
            await models.EjercicioEntrenamiento.destroy({
                where: {
                    idEntrenamiento: id,
                },
            });
    
            await entrenamiento.destroy();
    
        } catch (error) {
            throw error
        }
    };
}

module.exports = ejercicioEntrenamientoConnection;