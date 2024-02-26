// Gonzalo Martinez Haro
const {response,request} = require('express');
const Conexion = require('../database/eventoUsuarioConnection')
const conx = new Conexion();



const eventoUsuarioInsert = (req,res = response) => {

    conx.insertEventoUsuario(req.body).then( msg => {
        console.log('Insertado correctamente')
        res.status(200).json(msg)
    }).catch( err => {
        console.log('No se ha podido realizar la inserción')
        res.status(203).json(err)
    })
}

module.exports = {
    eventoUsuarioInsert
}