/**
 * @author Marina Laguna
 */
require('dotenv').config()
const { Sequelize } = require('sequelize');
const models = require('../../models');
const Conexion = require('../connection')
const conexion = new Conexion()

class ejercicioConnection{
    constructor() {}

    getEjercicios = async() => {
        let ejercicios = [];
        conexion.conectar;
        
        ejercicios = await models.Ejercicio.findAll({
            attributes: ['id'],
            include: [
                { model: models.Calentamiento, as: 'calentamiento', attributes: ['ejercicio'] },
                { model: models.Principal, as: 'principal', attributes: ['ejercicio'] },
                { model: models.Relax, as: 'relax', attributes: ['ejercicio'] }
            ]
        });
        conexion.desconectar;
        return ejercicios;
    }

    getEjercicioId = async(id) => {
        conexion.conectar;
        let ejercicio = await models.Ejercicio.findByPk(id, {
            include: [
                { model: models.Calentamiento, as: 'calentamiento', attributes: ['ejercicio'] },
                { model: models.Principal, as: 'principal', attributes: ['ejercicio'] },
                { model: models.Relax, as: 'relax', attributes: ['ejercicio'] }
            ]
        });
    
        conexion.desconectar;
        return ejercicio;
    }

    insertEjercicio = async(body) => {
        let resultado =  0;
        conexion.conectar;
    
        try {
            const nuevoEjercicio = await models.Ejercicio.create(body);
            const nuevoCalentamiento = await models.Calentamiento.create({ ejercicio: body.calentamiento });
            const nuevoPrincipal = await models.Principal.create({ ejercicio: body.principal });
            const nuevoRelax = await models.Relax.create({ ejercicio: body.relax });
            
            await nuevoEjercicio.setCalentamiento(nuevoCalentamiento);
            await nuevoEjercicio.setPrincipal(nuevoPrincipal);
            await nuevoEjercicio.setRelax(nuevoRelax);
            resultado =  1;
            return resultado;
        } catch (error) {
            return error;
        } finally {
            conexion.desconectar;
        }
    }

    updateEjercicio = async(id,body) => {
        let resultado;
        conexion.conectar;
        resultado = await models.Ejercicio.findByPk(id);
            
        if (!resultado){
            this.desconectar();
            throw error;
        }
        await resultado.update(body);
    }

    deleteEjercicio = async(id) => {
        let resultado;
        conexion.conectar;

        resultado = await models.Ejercicio.findByPk(id);

        if (!resultado){
            this.desconectar();
            throw error;
        }

        await resultado.destroy();
    }
}

module.exports = ejercicioConnection;