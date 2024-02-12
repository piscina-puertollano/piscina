const { response, request } = require("express");
const Conexion = require("../database/UserConnection");
const bcrypt = require("bcrypt");
const { generateRandPass } = require("../helpers/user");
const { generarJWT } = require("../helpers/jwt");

const showUser = (req, res = response) => {
  const conx = new Conexion();

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
  const conx = new Conexion();
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
  const conx = new Conexion();
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
  const conx = new Conexion();
  let pass = req.body.password;

  req.body.password = await bcrypt.hash(pass, 10);

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
  const conx = new Conexion();
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

  conx
    .updateUser(req.body.id, req.body)
    .then((msg) => {
      res.status(200).json(msg);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

const forgetPass = async (req, res) => {
  const conx = new Conexion();
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
      res.status(404).json({ msg: "User not found" });
    });
};

const index = async (req, res) => {
  const conx = new Conexion();

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

const deleteUser = async (req, res) => {
  const conx = new Conexion();

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
  const conx = new Conexion();

  conx
    .showSociosOfTutor(req.params.idTutor)
    .then((msg) => {
      res.status(200).json(msg);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

const showTutorsOfSocio = async (req, res) => {
  const conx = new Conexion();

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

  if (Array.isArray(socioId)) {
    let i = 0;
    while (socioId.length > i) {
       await setUserToTutor(tutorId, socioId[i], arrSocios)
      i++;
    }
    } else {
        setUserToTutor(tutorId, socioId, arrSocios)
    }

  res.status(200).json(arrSocios);
};


const setUserToTutor = async (tutorId, socioId, arrSocios) =>{
    const conx = new Conexion();
  await  conx.asignUser(tutorId, socioId)
    .then((msg) => {
        arrSocios.push(msg);
        console.log(arrSocios)
    })
    .catch((error) => {
        res.status(400).json(error);
    });
}

const deleteOldSocios = async (tutorId, socioId, arrSocios) =>{
    const conx = new Conexion();
  await  conx.removeSocioOfTutor(tutorId, socioId)
    .then((msg) => {
        arrSocios.push(msg);
    })
    .catch((error) => {
        res.status(400).json(error);
    });
}

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
  asignUser
};
