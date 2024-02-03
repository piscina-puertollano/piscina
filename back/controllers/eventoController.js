const {response,request} = require('express');
const Conexion = require('../database/eventoConnection')
const conx = new Conexion();

const eventosGet = (req,res = response) => {

    conx.getEventos().then( msg => {
        console.log('Listado de eventos correcto')
        res.status(200).json(msg);
    }).catch( err => {
        console.log('No hay registros')
        res.status(203).json(err)
    })

}

const eventoGet = (req,res = response) => {

    conx.getEvento(req.params.id).then( msg => {
        console.log('Evento obtenido correctamente')
        res.status(200).json(msg)
    }).catch( err => {
        console.log('No se ha obtenido el evento')
        res.status(203).json(err)
    })
}

const eventoInsert = (req,res = response) => {

    conx.insertEvento(req.body).then( msg => {
        console.log('Insertado correctamente')
        res.status(200).json(msg)
    }).catch( err => {
        console.log('No se ha podido realizar la inserción del evento')
        req.status(203).json(err)
    })
}

const eventoUpdate = (req,res = response) => {

    conx.updateEvento(req.params.id,req.body).then( msg => {
        console.log('Actualización del evento realizada')
        res.status(200).json(msg)
    }).catch( err => {
        console.log('No se a podido realizar la actualización de evento')
        res.status(203).json(err)
    })
}

const eventoDelete = (req,res = response) => {

    conx.deleteEvento(req.params.id).then( msg => {
        console.log('Evento eliminado con exito')
        res.status(200).json(msg)
    }).catch( err => {
        console.log('No se a podido eliminar el evento')
        res.status(203).json(err)
    })
}

module.exports = {
    eventosGet,
    eventoGet,
    eventoInsert,
    eventoUpdate,
    eventoDelete
}