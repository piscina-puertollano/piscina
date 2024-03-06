// Gonzalo Martinez Haro
const {response,request} = require('express');
const Conexion = require('../../database/events/eventoUsuarioConnection')
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

const eventosUsuariosGets = (req,res = response) => {

    conx.getEventosUsuarios().then( msg => {
        console.log('Obtenido Correctamente')
        res.status(200).json(msg)
    }).catch( err => {
        console.log('No se ha podido obtener los datos')
        res.status(203).json(err)
    })
} 

const getUsuarioConIdEvento = (req,res = response) => {

    conx.getUsuariosConIdEvento(req.params.id).then( msg => {
        console.log('Obtenido Correctamente')
        res.status(200).json(msg)

    }).catch( err => {
        console.log('No se ha podido obtener los usuarios')
        res.status(203).json(err)
    });
}

module.exports = {
    eventoUsuarioInsert,
    eventosUsuariosGets,
    getUsuarioConIdEvento
}