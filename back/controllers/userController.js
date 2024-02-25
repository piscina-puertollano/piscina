const { response, request } = require("express");
const Conexion = require("../database/UserConnection");
const bcrypt = require("bcrypt");
const { generateRandPass } = require("../helpers/user");
const { generarJWT } = require("../helpers/jwt");

const conx = new Conexion();

const showUser = (req, res = response) => {
  conx
    .showUser(req.params.id)
    .then((msg) => {
      res.status(200).json(msg);
    })
    .catch((err) => {
      res.status(404).json({ msg: "User not found" });
    });
};

const getUserByValue = (req, res = response) => {
  let value = req.body.email;
  if (value == null) {
    value = req.body.id;
  }
  conx
    .searchByValue(value)
    .then((msg) => {
      if (msg.length == 0) {
        res.status(404).json({ msg: "User not found" });
      } else {
        res.status(200).json(msg);
      }
    })
    .catch((err) => {
      res.status(404).json({ msg: "User not found" });
    });
};

const login = (req, res) => {
  let email = req.body.email;
  let storedHash = "";

  conx
    .getUserByEmail(email)
    .then((msg) => {
      bcrypt.compare(req.body.password, storedHash, (err, result) => {
        if (result) {
          res.status(401).json({ msg: "Error with credentials, try again" });
        }
        conx.showRolUser(msg.id).then((roles) => {
          let arrRoles = [];
          roles.forEach((element) => {
            if (element.id_rol != null) {
              arrRoles.push(element.id_rol);
            }
          });

          let token = generarJWT(msg.id, arrRoles);
          res.status(200).json({
            user: msg,
            token,
          });
        });
      });
    })
    .catch((err) => {
      res.status(401).json({ msg: "Error with credentials, try again" });
    });
};
const newUser = async (req, res) => {
  let randPass = generateRandPass();
  req.body.password = randPass;

  req.body.password = await bcrypt.hash(randPass, 10);

  conx
    .registrarUsuario(req.body)
    .then((msg) => {
      console.log(msg);
      res.status(200).json(msg);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

const updateUser = async (req, res) => {
  let pass = req.body.password;

  if (pass != null) {
    req.body.password = await bcrypt.hash(pass, 10);
  }

  if (req.body.roles != null) {
    await conx
      .updateRolsUser(req.body.id, req.body.roles)
      .then((msg) => {
        // console.log(msg)
        // res.status(200).json(msg)
      })
      .catch((error) => {
        console.log(error);
        // res.status(200).json(error)
      });
  }

  conx.updateUser(req.body.id, req.body)
    .then((msg) => {
      res.status(200).json(msg);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

const forgetPass = async (req, res) => {
  let email = req.body.email;
  let pass = generateRandPass();
  let newPassword = { password: await bcrypt.hash(pass, 10) };
  conx
    .getUserByEmail(email)
    .then((idUser) => {
      console.log(idUser.id);
      conx
        .updateUser(idUser.id, newPassword)
        .then((msg) => {
          res.status(200).json({ msg: "new password: " + pass });
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json(error);
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ msg: "Usuario no encontrado" });
    });
};

const index = async (req, res) => {
  conx
    .indexUsers()
    .then((msg) => {
      res.status(200).json(msg);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

const showSocios = async (req, res) => {
  conx
    .showSocios()
    .then((msg) => {
      res.status(200).json(msg);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(400)
        .json({ msg: "No se han encontrado socios", error: error });
    });
};

const deleteUser = async (req, res) => {
  conx
    .deleteUser(req.params.id)
    .then((msg) => {
      res.status(200).json(msg);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

const showSociosOfTutor = async (req, res) => {
  conx
    .showSociosOfTutor(req.params.idTutor)
    .then((msg) => {
      let arrSocios = [];
      msg.forEach((element) => {
        let rtnSocio = {
          id: element.socio.id,
          firstName: element.socio.firstName,
          lastName: element.socio.lastName,
          email: element.socio.email,
        };
        arrSocios.push(rtnSocio);
      });

      res.status(200).json(arrSocios);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

const showTutorsOfSocio = async (req, res) => {
  conx
    .showTutorsOfSocio(req.params.idSocio)
    .then((msg) => {
      res.status(200).json(msg);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

const asignUser = async (req, res) => {
  let arrSocios = [];
  const tutorId = req.body.id_tutor;
  const socioId = req.body.id_socio;
  console.log(Array.isArray(socioId), socioId);
  if (Array.isArray(socioId)) {
    if (socioId.length == 0) {
      conx.removeSociosUser(tutorId).then((msg) => {
        console.log(msg)
        return;          
      });
    } else {
      for (const socio of socioId) {
        await setUserToTutor(tutorId, socio.id, arrSocios);
      }
    }
  } else {
    await setUserToTutor(tutorId, socioId.id, arrSocios);
  }

  if (arrSocios.length >= 1) {
    res.status(201).json(arrSocios);
  } else {
    res.status(401).json({ msg: "El usuario ya está asociado o no existe" });
  }
};

const setUserToTutor = async (tutorId, socioId, arrSocios) => {
  await conx
    .asignUser(tutorId, socioId)
    .then((msg) => {
      arrSocios.push(msg);
      console.log(msg)
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

const deleteOldSocios = async (tutorId, socioId, arrSocios) => {
  await conx
    .removeSocioOfTutor(tutorId, socioId)
    .then((msg) => {
      arrSocios.push(msg);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

/**
 * Esta función debería ir al controlador de rolController, 
 * pero como no vamos a tener lo que es un CRUD de roles,
 * y los roles que hay son los que se quedan, no voy a hacer 
 * un controlador para una sola función, es por eso que meto aquí
 * la función de mostrar roles en usuarios.
 */
const showRols = async (req, res) => {
  conx
    .showRols()
    .then((msg) => {
      res.status(200).json(msg);
    })
    .catch((error) => {
      res.status(400).json({ msg: "Roles no encontrados", error: error });
    });
};

module.exports = {
  newUser,
  showUser,
  index,
  forgetPass,
  updateUser,
  login,
  getUserByValue,
  deleteUser,
  showSociosOfTutor,
  showTutorsOfSocio,
  asignUser,
  deleteOldSocios,
  showSocios,
  showRols,
};
