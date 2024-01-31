require('dotenv').config()
const { Sequelize, Op } = require('sequelize');
const models = require('../models/index.js');

class ConexionSequilze {

    constructor() {
        this.db = new Sequelize(process.env.DB_DEV, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect:process.env.DB_DIALECT,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
             },
          });
    }

    conectar = () => {
        this.db.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });
    }

    desconectar = () => {
        //this.db.close();
        process.on('SIGINT', () => conn.close())
    }
    
    getUserByEmail = async(email) => {
        let resultado = [];
        this.conectar();
        resultado = await models.User.findOne({
            where:{email:email},
            attributes: ['id', 'firstName', 'lastName','email']
        });
        this.desconectar();
        if (!resultado){
            throw error;
        }
        return resultado;
    }

    registrarUsuario = async(body) => {
        let newUser = 0
        this.conectar();
        console.log(body)
        try{
            newUser = await models.Users.create(body);

        } catch (error) {
            if (error instanceof Sequelize.UniqueConstraintError) {
                console.log(`El id ${body.id} ya existe en la base de datos.`);
            } else {
                console.log('Ocurrió un error desconocido: ', error);
            }
            throw error; 
        } finally {
            this.desconectar();
        }
        return newUser;
    }

    
}

module.exports = ConexionSequilze;
