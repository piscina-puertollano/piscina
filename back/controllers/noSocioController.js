// Gonzalo Martinez Haro
const {response,request} = require('express');
const Conexion = require('../database/noSocioConnection')
const Conexion2 = require('../database/eventoNoSocioConnection')
const conx = new Conexion();
const conx2 = new Conexion2();

const noSociosGet = (req,res = response) => {

    conx.getNoSocios().then( msg => {
        console.log('Listado de noSocios correcto')
        res.status(200).json(msg);
    }).catch( err => {
        console.log('No hay registros')
        res.status(203).json(err)
    })

}

const noSocioGet = (req,res = response) => {

    conx.getNoSocio(req.params.id).then( msg => {
        console.log('NoSocio obtenido correctamente')
        res.status(200).json(msg)
    }).catch( err => {
        console.log('No se ha obtenido el noSocio')
        res.status(203).json(err)
    })
}

const noSocioInsert = (req,res = response) => {

    var idNoSocio
    conx.insertNoSocio(req.body).then( msg => {
        
        console.log('Insertado correctamente')
        res.status(200).json(msg)
        idNoSocio = msg

        conx2.insertEventoNoSocio(req.params.idEvento,idNoSocio).then( msg => {
            console.log('Insertada relación correctamente')
        }).catch( err => {
            console.log('No se ha podido insertar el EventoNoSocio')
            req.status(203).json(err)
        })

    }).catch( err => {
        console.log('No se ha podido insertar el noSocio')
        req.status(203).json(err)
    })

    
   
}

const noSocioUpdate = (req,res = response) => {

    conx.updateNoSocio(req.params.id,req.body).then( msg => {
        console.log('Actualización del evento realizada')
        res.status(200).json(msg)
    }).catch( err => {
        console.log('No se ha podido actualizar el noSocio')
        res.status(203).json(err)
    })
}

const noSocioDelete = (req,res = response) => {

    conx2.deleteConIdNoSocio(req.params.id).then( msg => {
        console.log('Eliminado eventoNoSocio con exito')
        res.status(200).json(msg)

        conx.deleteNoSocio(req.params.id).then( msg => {
            console.log('Eliminado noSocio correctamente')
        }).catch( err => {
            console.log('No se ha podido eliminar el noSocio')
            req.status(203).json(err)
        })

    }).catch( err => {
        console.log('No se ha podido eliminar eventoNoSocio')
        res.status(203).json(err)
    })
}

module.exports = {
    noSociosGet,
    noSocioGet,
    noSocioInsert,
    noSocioUpdate,
    noSocioDelete
}