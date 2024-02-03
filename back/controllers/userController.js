const {response, request} = require("express");
const Conexion = require("../database/ConexionUser");
const bcrypt = require('bcrypt');
const { generateRandPass } = require("../helpers/user");


const getUserByEmail = (req, res = response) => {
    const conx = new Conexion();

    conx.getUserByEmail(req.body.email)
        .then((msg) => {
            res.status(200).json(msg);
        })
        .catch((err) => {
            res.status(203).json({msg: "No se han encontrado registros"});
        });
};

const newUser = async (req, res) => {
    const conx = new Conexion()
    let pass = req.body.password

    req.body.password = await bcrypt.hash(pass, 10)

    conx.registrarUsuario(req.body)
    .then((msg) => {
        console.log(msg)
        res.status(200).json(msg)
    })
    .catch(error => {
        res.status(400).json(error)
    })
    
}

const updateUser = async (req, res) => {
    const conx = new Conexion()
    let pass = req.body.password

    req.body.password = await bcrypt.hash(pass, 10)

    conx.updateUser(req.body)
    .then((msg) => {
        console.log(msg)
        res.status(200).json(msg)
    })
    .catch(error => {
        res.status(400).json(error)
    })
}

const forgetPass = async (req, res) => {
    const conx = new Conexion()
    let email = req.body.email
    let pass = generateRandPass()
    let newPassword = {password: await bcrypt.hash(pass, 10)}
    conx.getUserByEmail(email).then(idUser => {
        console.log(idUser.id)
        conx.updateUser(idUser.id, newPassword)
            .then((msg) => {
                res.status(200).json({msg:'new password: '+pass})
            })
            .catch(error => {
                console.log(error)
                res.status(400).json(error)
            })
    }).catch(error=>{
        console.log(error)
        res.status(404).json({msg:'User not found'})

    })
}

const index = async (req, res) => {
    const conx = new Conexion()

    conx.indexUsers()
        .then((msg) => {
            res.status(200).json(msg)

        })
        .catch(error => {
            res.status(400).json(error)
        })
}




module.exports = {
    newUser,
    getUserByEmail,
    index,
    forgetPass,
    updateUser
};
