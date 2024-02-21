const bcrypt = require('bcrypt');
const { verifyToken } = require('../helpers/jwt');
const jwt = require('jsonwebtoken')


const checkToken = (req, res, next) =>{
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({'msg':'No hay token en la petición.'});
    }

    try {
        
        const {uid , roles} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.userId = uid;
        req.uroles = roles;
        console.log(uid);
        console.log(token);
        next();
        
    }catch(error){
        console.log(error);
        res.status(401).json({'msg':'Token no valido'});
    }
}

// El id_rol del admin es 1
const tokenCanAdmin = (req, res, next) => {

    let roles = req.uroles
    let i = 0
    let check = true
    while(i<roles.length && check){
        if(roles[i] === process.env.ID_ROL_ADMIN) {
            check = false
        }
        i++
    }

    if(!check){
        next();
    }else{
        res.status(400).json({msg:'Token sin permisos'})
    }

}

// El id_rol del tutor es 2
const tokenCanTutor = (req, res, next) => {

    let roles = req.uroles
    let i = 0
    let check = true
    while(i<roles.length && check){
        if(roles[i] === process.env.ID_ROL_TUTOR) {
            check = false
        }
        i++
    }

    if(!check){
        next();
    }else{
        res.status(400).json({msg:'Token sin permisos'})
    }

}

// El id_rol del socio es 3
const tokenCanSocio = (req, res, next) => {

    let roles = req.uroles
    let i = 0
    let check = true
    while(i<roles.length && check){
        if(roles[i] === process.env.ID_ROL_SOCIO) {
            check = false
        }
        i++
    }

    if(!check){
        next();
    }else{
        res.status(400).json({msg:'Token sin permisos'})
    }
}

// El id_rol del entrenador es 4
const tokenCanTrainer = (req, res, next) => {

    let roles = req.uroles
    let i = 0
    let check = true
    while(i<roles.length && check){
        if(roles[i] === process.env.ID_ROL_TRAINER) {
            check = false
        }
        i++
    }

    if(!check){
        next();
    }else{
        res.status(400).json({msg:'Token sin permisos'})
    }
}

module.exports = {
    checkToken,
    tokenCanAdmin,
    tokenCanTutor,
    tokenCanSocio,
    tokenCanTrainer
}