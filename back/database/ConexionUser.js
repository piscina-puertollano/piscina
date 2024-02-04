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
        resultado = await models.Users.findOne({
            where:{
                email:email
            },
            attributes: ['id', 'firstName', 'lastName','email']
        });
        this.desconectar();
        if (!resultado){
            throw new Error('user not found');
        }
        return resultado;
    }

    registrarUsuario = async(user) => {
        let newUser = 0
        this.conectar();
        try{
            newUser = await models.Users.create(user);

        } catch (error) {
            if (error instanceof Sequelize.UniqueConstraintError) {
                console.log(`El id ${user.id} ya existe en la base de datos.`);
            } else {
                console.log('Ocurrió un error desconocido: ', error);
            }
            throw error; 
        } finally {
            this.desconectar();
        }
        return newUser;
    }

    updateUser = async(id, user) => {
        let upUser = 0
        this.conectar();
        try{
            upUser = await models.Users.findByPk(id)
            upUser.update(user)

        } catch (error) {
            throw error; 
        } finally {
            this.desconectar();
        }
        return upUser;
    }

    indexUsers = async() =>{

        let listUsers = 0
        this.conectar();

        try{
            listUsers = await models.Users.findAll({
                attributes: ['id', 'firstName', 'lastName', 'email','isSocio','createdAt'],
                include:{
                    model: models.Rol,
                    as:'roles',
                    attributes:['id', 'name']
            }
            });

        } catch (error) {
            throw error; 
        } finally {
            this.desconectar();
        }
        return listUsers;
    }

}

module.exports = ConexionSequilze;
