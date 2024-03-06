const jwt = require("jsonwebtoken");
const Conexion = require("../database/users/UserConnection");

/**
 * @author: badr
 */

const statusUser = (req, res, next) => {
  const conx = new Conexion();
  conx
    .getUserByEmail(req.body.email)
    .then((msg) => {
      if (msg.active == 1) {
        next();
      } else {
        res.status(400).json({ msg: "Cuenta desactivada" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: "usuario no encontrado", error: err });
    });
};

const checkToken = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({ msg: "No hay token en la petición." });
  }

  try {
    const { uid, roles } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    req.userId = uid;
    req.uroles = roles;
    console.log(uid);
    console.log(token);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Token no valido" });
  }
};

// El id_rol del admin es 1
const tokenCanAdmin = (req, res, next) => {
  let roles = req.uroles;
  let i = 0;
  let check = true;
  while (i < roles.length && check) {
    if (roles[i] == process.env.ID_ROL_ADMIN) {
      check = false;
    }
    i++;
  }

  if (!check) {
    next();
  } else {
    res.status(400).json({ msg: "Token sin permisos" });
  }
};

// El id_rol del tutor es 2
const tokenCanTutor = (req, res, next) => {
  let roles = req.uroles;
  let i = 0;
  let check = true;
  while (i < roles.length && check) {
    if (roles[i] == process.env.ID_ROL_TUTOR || 
      roles[i] == process.env.ID_ROL_ADMIN) {
      check = false;
    }
    i++;
  }

  if (!check) {
    next();
  } else {
    res.status(400).json({ msg: "Token sin permisos" });
  }
};

// El id_rol del socio es 3
const tokenCanSocio = (req, res, next) => {
  let roles = req.uroles;
  let i = 0;
  let check = true;
  while (i < roles.length && check) {
    if (roles[i] == process.env.ID_ROL_SOCIO||
      roles[i] == process.env.ID_ROL_ADMIN) {
      check = false;
    }
    i++;
  }

  if (!check) {
    next();
  } else {
    res.status(400).json({ msg: "Token sin permisos" });
  }
};

const tokenCanTutorOrSocio = (req, res, next) => {
  let roles = req.uroles;
  let i = 0;
  let check = true;
  while (i < roles.length && check) {
    if (roles[i] == process.env.ID_ROL_SOCIO||
      roles[i] == process.env.ID_ROL_TUTOR ||
      roles[i] == process.env.ID_ROL_ADMIN
      ) {
      check = false;
    }
    i++;
  }

  if (!check) {
    next();
  } else {
    res.status(400).json({ msg: "Token sin permisos" });
  }
};

// El id_rol del entrenador es 4
const tokenCanTrainer = (req, res, next) => {
  let roles = req.uroles;
  let i = 0;
  let check = true;
  while (i < roles.length && check) {
    if (roles[i] == process.env.ID_ROL_TRAINER || 
      roles[i] == process.env.ID_ROL_ADMIN) {
      check = false;
    }
    i++;
  }

  if (!check) {
    next();
  } else {
    res.status(400).json({ msg: "Token sin permisos" });
  }
};

// El id_rol del entrenador es 5
const tokenCanRedactor = (req, res, next) => {
    let roles = req.uroles;
    let i = 0;
    let check = true;
    while (i < roles.length && check) {
      console.log(process.env.ID_ROL_ADMIN)
    if (
      roles[i] == process.env.ID_ROL_REDACTOR ||
      roles[i] == process.env.ID_ROL_ADMIN
    ) {
      check = false;
    }
    i++;
  }

  if (!check) {
    next();
  } else {
    res.status(400).json({ msg: "Token sin permisos" });
  }
};

// El id_rol del entrenador es 6
const tokenCanWebmaster = (req, res, next) => {
  let roles = req.uroles;
  let i = 0;
  let check = true;
  while (i < roles.length && check) {
    if (roles[i] == process.env.ID_ROL_WEBMASTER ||
      roles[i] == process.env.ID_ROL_ADMIN
      ) {
      check = false;
    }
    i++;
  }

  if (!check) {
    next();
  } else {
    res.status(400).json({ msg: "Token sin permisos" });
  }
};

const tokenCanUserAuth = (req, res, next) => {
  let roles = req.uroles;
  let i = 0;
  let check = true;
  console.log(roles);

  while (i < roles.length && check) {
    if (roles[i] <= process.env.ID_ROL_WEBMASTER) {
      check = false;
    }
    i++;
  }

  if (!check) {
    next();
  } else {
    res.status(400).json({ msg: "Token sin permisos" });
  }
};

module.exports = {
  statusUser,
  checkToken,
  tokenCanAdmin,
  tokenCanTutor,
  tokenCanSocio,
  tokenCanTutorOrSocio,
  tokenCanTrainer,
  tokenCanUserAuth,
  tokenCanRedactor,
  tokenCanWebmaster,
};
