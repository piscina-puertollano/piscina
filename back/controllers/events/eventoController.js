// Gonzalo Martinez Haro
const {response,request} = require('express');
const Conexion = require('../../database/events/eventoConnection')
const conx = new Conexion();
const Conexion2 = require('../../database/events/eventoUsuarioConnection')
const conx2 = new Conexion2();
const Conexion3 = require('../../database/events/eventoNoSocioConnection')
const conx3 = new Conexion3();

const eventosGet = (req,res = response) => {

    conx.getEventos().then( msg => {
        console.log('Listado de eventos correcto')
        res.status(200).json(msg);
    }).catch( err => {
        console.log('No hay registros')
        res.status(203).json(err)
    })

}


const eventosVisiblesGet = (req,res = response) => {

    
    conx.getEventosVisibles().then( msg => {
        console.log('Listado de eventos correcto')
        res.status(200).json(msg);
    }).catch( err => {
        console.log('No hay registros')
        res.status(203).json(err)
    })

}

const eventoGet = (req,res = response) => {

    console.log('eventos')
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
        console.log('No se ha podido insertar el evento')
        req.status(203).json(err)
    })
}

const eventoUpdate = (req,res = response) => {

    console.log(req.params.id,req.body)
    conx.updateEvento(req.params.id,req.body).then( msg => {
        console.log('Actualización del evento realizada')
        res.status(200).json(msg)
    }).catch( err => {
        console.log('No se ha podido actualizar el evento')
        res.status(203).json(err)
    })
}

const eventoDelete = (req,res = response) => {

    conx2.deleteConIdEvento(req.params.id).then( msg => {
        
        console.log('Eliminado eventoUusario con exito')
        
        conx3.deleteWithIdEvento(req.params.id).then( msg => {
            console.log('Eliminado eventoNoSocio correctamente')

            conx.deleteEvento(req.params.id).then( msg => {
                console.log('Eliminado evento correctamente')
            }).catch( err => {
                console.log('No se ha podido eliminar el evento')
                res.status(203).json(err)
            })

        }).catch( err => {
            console.log('No se ha podido eliminar eventoNoSocio')
            res.status(203).json(err)
        })

        res.status(200).json(msg)

    }).catch( err => {
        console.log('No se ha podido eliminar eventoUsuario ')
        res.status(203).json(err)
    })
}

module.exports = {
    eventosVisiblesGet,
    eventosGet,
    eventoGet,
    eventoInsert,
    eventoUpdate,
    eventoDelete
}