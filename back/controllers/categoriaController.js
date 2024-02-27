// Gonzalo Martinez Haro
const {response,request} = require('express');
const Conexion = require('../database/categoriaConnection')
const conx = new Conexion();
const Conexion2 = require('../database/eventoConnection')
const conx2 = new Conexion2();

const categoriasGet = (req,res = response) => {

    conx.getCategorias().then( msg => {
        console.log('Listado de categorias correcto')
        res.status(200).json(msg);
    }).catch( err => {
        console.log('No hay registros')
        res.status(203).json(err)
    })

}

const categoriaGet = (req,res = response) => {

    conx.getCategoria(req.params.id).then( msg => {
        console.log('Categoria obtenido correctamente')
        res.status(200).json(msg)
    }).catch( err => {
        console.log('No se ha obtenido la categoria')
        res.status(203).json(err)
    })
}

const categoriaInsert = (req,res = response) => {

    conx.insertCategoria(req.body).then( msg => {
        console.log('Insertado correctamente')
        res.status(200).json(msg)
    }).catch( err => {
        console.log('No se ha podido insertar la categoria')
        req.status(203).json(err)
    })
}

const categoriaUpdate = (req,res = response) => {

    conx.updateCategoria(req.params.id,req.body).then( msg => {
        console.log('Actualización de la categoria realizada')
        res.status(200).json(msg)
    }).catch( err => {
        console.log('No se ha podido actualizar la categoria')
        res.status(203).json(err)
    })
}

const categoriaDelete = (req,res = response) => {

    conx2.deleteConIdCategoria(req.params.id).then( msg => {

        conx.deleteCategoria(req.params.id).then( msg => {
            console.log('Categoria eliminada con exito')
            res.status(200).json(msg)
        }).catch( err => {
            console.log('No se a podido eliminar la categoria')
            res.status(203).json(err)
        })
    }).catch( err => {
        console.log('No se ha podido eliminar el evento ')
        res.status(203).json(err)
    })
}

module.exports = {
    categoriasGet,
    categoriaGet,
    categoriaInsert,
    categoriaUpdate,
    categoriaDelete
}