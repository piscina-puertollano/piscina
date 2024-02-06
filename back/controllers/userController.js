const {response, request} = require("express");
const Conexion = require("../database/ConexionUser");
const bcrypt = require('bcrypt');
const { generateRandPass } = require("../helpers/user");
const { generarJWT } = require("../helpers/jwt");


const showUser = (req, res = response) => {
    const conx = new Conexion();

    conx.showUser(req.params.id)
        .then((msg) => {
            res.status(200).json(msg);
        })
        .catch((err) => {
            res.status(404).json({msg: 'User not found'});
        });
};

const getUserByValue = (req, res = response) => {
    const conx = new Conexion();
    let value = req.body.email
    if(value == null){
        value = req.body.id
    }
    conx.searchByValue(value)
        .then((msg) => {
            if(msg.length == 0){
                res.status(404).json({msg:'User not found'});
                
            }else{
                res.status(200).json(msg);
            }
        })
        .catch((err) => {
            res.status(404).json({msg: 'User not found'});
        });
};

const login = (req, res) => {
    let email = req.body.email;
    const conx = new Conexion();
    let storedHash = '';

    conx.getUserByEmail(email)
        .then((msg) => {
            console.log('llego')
            bcrypt.compare(req.body.password, storedHash, (err, result) => {
                if (result) {
                    res.status(401).json({msg: 'Error with credentials, try again'})
                }
                conx.showRolUser(msg.id).then(roles => {
                    let arrRoles = []
                    roles.forEach(element => {
                        if (element.id_rol != null) {
                            arrRoles.push(element.id_rol)
                        }
                    })
                    
                    let token = generarJWT(msg.id, arrRoles)
                    res.status(200).json({
                        user: msg,
                        roles: arrRoles,
                        token
                    })
                })
            })
        })
        .catch((err) => {
            res.status(401).json({msg: 'Error with credentials, try again'})

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

    if(pass !=null){
        req.body.password = await bcrypt.hash(pass, 10)
    }

    conx.updateUser(req.body.id,req.body)
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
            console.log(error)
            res.status(400).json(error)
        })
}




module.exports = {
    newUser,
    showUser,
    index,
    forgetPass,
    updateUser,
    login,
    getUserByValue
};
