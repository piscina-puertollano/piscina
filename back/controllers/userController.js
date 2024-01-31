const {response, request} = require("express");
const Conexion = require("../database/ConexionUser");
const bcrypt = require('bcrypt');


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

const signup = async (req, res) => {
    const conx = new Conexion()
    let pass = req.body.password
    req.body.password = await bcrypt.hash(pass, 10)
    conx.registrarUsuario(req.body)
        .then((msg) => {
            let rtnObj = {
                id: msg.dataValues.id,
                firsName: msg.dataValues.firsName,
                lastName: msg.dataValues.lastName,
                email: msg.dataValues.email,
            }
            res.status(200).json(rtnObj)

        })
        .catch(error => {
            res.status(400).json(error)
        })
}

module.exports = {
    signup,
    getUserByEmail
};
