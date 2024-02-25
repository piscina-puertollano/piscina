require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const models = require("../models/index.js");
const Conexion = require("./connection.js");

const conexion = new Conexion();

class UserModel {
  constructor() {}

  getUserByEmail = async (email) => {
    let resultado = [];
    conexion.conectar();
    resultado = await models.Users.findOne({
      where: {
        email: email,
      },
      attributes: ["id", "firstName", "lastName", "email", "tlf", "domicilio", "corriente_pago","active"],
    });
    conexion.desconectar();
    if (!resultado) {
      throw new Error("user not found");
    }
    return resultado;
  };

  getUserById = async (id_user) => {
    let resultado = [];
    conexion.conectar();
    resultado = await models.Users.findByPk(id_user,{
      attributes: ["id", "firstName", "lastName", "email", "tlf", "domicilio", "corriente_pago","active"],
    });
    conexion.desconectar();
    if (!resultado) {
      throw new Error("user not found");
    }
    return resultado;
  };

  searchByValue = async (value) => {
    let resultado = [];
    conexion.conectar();
    resultado = await models.Users.findAll({
      where: {
        [Op.or]: {
          email: { [Op.like]: `%${value}%` },
          id: { [Op.like]: `%${value}%` },
        },
      },
      attributes: ["id", "firstName", "lastName", "email"],
    });
    conexion.desconectar();
    if (!resultado) {
      throw new Error("user not found");
    }
    return resultado;
  };
  showUser = async (userId) => {
    conexion.conectar();
    let resultado = await models.Users.findByPk(userId, {
      attributes: ["id", "firstName", "lastName", "email", "tlf", "domicilio", "corriente_pago","active"],
      include: [
        {
        model: models.Rol,
        as: "roles",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        }
      },
        {
          model: models.Assets,
          as: "image",
          attributes: ["ruta"]
        },
    ]
    });

    if (!resultado) {
      conexion.desconectar();
      throw error;
    }
    conexion.desconectar();
    return resultado;
  };

  showRolUser = async (userId) => {
    conexion.conectar();
    let resultado = await models.UserRol.findAll({
      where: { id_user: userId },
    });

    if (!resultado) {
      conexion.desconectar();
      throw error;
    }
    conexion.desconectar();
    return resultado;
  };

  deleteUser = async (userId) => {
    conexion.conectar();
    let resultado = await models.Users.findByPk(userId);
    await resultado.destroy();

    if (!resultado) {
      conexion.desconectar();
      throw error;
    }
    conexion.desconectar();
    return resultado;
  };

  registrarUsuario = async (user) => {
    let newUser = 0;
    conexion.conectar();
    try {
      newUser = await models.Users.create(user);
    } catch (error) {
      if (error instanceof Sequelize.UniqueConstraintError) {
        console.log(`El id ${user.id} ya existe en la base de datos.`);
      } else {
        console.log("Ocurrió un error desconocido: ", error);
      }
      throw error;
    } finally {
      conexion.desconectar();
    }
    return newUser;
  };

  updateUser = async (id, user) => {
    let upUser = 0;
    conexion.conectar();
    try {
      upUser = await models.Users.findByPk(id);
      await upUser.update(user);
      await upUser.save();
    } catch (error) {
      throw error;
    } finally {
      conexion.desconectar();
    }
    return upUser;
  };

  updateRolsUser = async (userId, rolId) => {
    console.log(userId);
    console.log(rolId);
    let upUsers = [];
    let updatedRoles = [];
    conexion.conectar();
    try {
      upUsers = await models.UserRol.findAll({ where: { id_user: userId } });

      if (upUsers.length >= 1) {
        for (let userRole of upUsers) {
          await userRole.destroy();
        }
      }

      if (Array.isArray(rolId)) {
        for (let rol of rolId) {
          let newRole = await models.UserRol.create({
            id_user: userId,
            id_rol: rol.id,
          });
          updatedRoles.push(newRole);
        }
      } else {
        console.log("entro");
        let newRole = await models.UserRol.create({
          id_user: userId,
          id_rol: rolId.id,
        });
        updatedRoles.push(newRole);
      }

      console.log(updatedRoles);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      conexion.desconectar();
    }
    return updatedRoles;
  };

  indexUsers = async () => {
    let listUsers = 0;
    conexion.conectar();

    try {
      listUsers = await models.Users.findAll({
        attributes: ["id","firstName","lastName", "email"],
        include: [
          {
          model: models.Rol,
          as: "roles",
          attributes: ["id"],
          through: {
            attributes: [],
          },
        },{
          model: models.Assets,
          as: "image",
          attributes: ["ruta"] 
      }],
      });
    } catch (error) {
      throw error;
    } finally {
      conexion.desconectar();
    }
    return listUsers;
  };

  showSocios = async () => {
    let listUsers = [];
    try{
      listUsers = await models.Users.findAll({
        attributes: ["id", "firstName", "lastName", "email"],
        include: 
        {
          model: models.Rol,
          as: "roles",
          attributes: [],
          where:{
            id: process.env.ID_ROL_SOCIO,
          },
          through: {
            attributes: [],
          }
        },
      })
    }catch(err){
      throw err;
    }finally{
      if(!listUsers){
        throw new Error("Socios no encontrados");
      }
      return listUsers;
    }

  }

  asignUser = async (tutorId, socioId) => {
    let listUsers = 0;
    conexion.conectar();

    try {
      await models.TutorUser.destroy({where: {id_tutor: tutorId}})
      if(socioId!=null){
        listUsers = await models.TutorUser.create({
          id_tutor: tutorId,
          id_socio: socioId,
        });
      }
    } catch (error) {
      console.log(error)
      throw error;
    } finally {
      conexion.desconectar();
      return listUsers;
    }
  };

  removeSociosUser = async (userId) => {
    let listUsers = 0;
    conexion.conectar();

    try {
      await models.TutorUser.destroy({where: {id_tutor: userId}})
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      conexion.desconectar();
      return listUsers;
    }
  }

  showSociosOfTutor = async (idTutor) => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.TutorUser.findAll({
        where: {
          id_tutor: idTutor,
        },
        attributes: [],
        include: [
          {
            model: models.Users,
            as: "socio",
            attributes: ["id", "firstName", "lastName", "email"],
          },
        ],
      });
    } catch (error) {
      throw error
    } finally {
      conexion.desconectar();
      if (!resultado) {
        throw new Error("user not found");
      }

      return resultado;
    }
  };

  showTutorsOfSocio = async (idSocio) => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.TutorUser.findAll({
        where: {
          id_socio: idSocio,
        },
        attributes: ["id_tutor"],
        include: [
          {
            model: models.Users,
            as: "tutor",
            attributes: ["id", "firstName", "lastName", "email"],
          },
        ],
      });
    } catch (error) {
      if (!resultado) {
        throw new Error("user not found");
      }
    } finally {
      conexion.desconectar();
      return resultado;
    }
  };

  removeSocioOfTutor = async (tutorId, idSocio) => {
    let resultado = [];
    try {
      conexion.conectar();
      resultado = await models.TutorUser.findAll({
        where: {
            id_tutor: tutorId,
            id_socio: idSocio
        },
        attributes: ["id_tutor"]
      }); 
      resultado.destroy();
    } catch (error) {
      if (!resultado) {
        throw new Error("user not found");
      }
    } finally {
      conexion.desconectar();
      return resultado;
    }
  };

  showRols = async () => { 
    let resultado = [];
    try{
      conexion.conectar();
      resultado = await models.Rol.findAll({
        attributes: ["id", "name"],
      });
    }catch(err){
      throw err;
    }finally{
      conexion.desconectar();
      if (!resultado) {
        throw new Error("Roles no encontrados");
      }
      return resultado;
    }
  }
}

module.exports = UserModel;
