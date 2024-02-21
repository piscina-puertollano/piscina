const path = require('path');
const fs   = require('fs');
const { subirArchivo } = require('../helpers/upload-files');


const cargarArchivo = async(req, res) => {

    try {
        
        if(!req.files || Object.keys(req.files).length === 0){
            res.status(404).send("No hay archivos para subir");
            return;
        }

        if(!req.files.archivo){
            res.status(404).send("No hay archivos para subir");
            return;
        }

        console.log("Archivos que vienen en req.files:",req.files);


        const nombre = await subirArchivo( req.files, undefined, 'imgs' );
        res.json({ nombre });


    } catch (msg) {
        res.status(400).json({ msg });
    }

}


const borrarImagen = async(req, res ) => {
    const  idborrado = req.params.id;
    const extension = 'jpg';
    const pathImagen = path.join( __dirname, '../uploads', 'imgs', idborrado + '.' + extension );
    console.log( pathImagen );
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
        res.status(200).json({ msg: "Borrado" });
    } else {
        res.status(404).json({ msg: "Archivo no encontrado" });
    }
}


const actualizarImagen = async(req, res ) => {
    res.status(200).json({ msg  : "Actual"});
}


const obtenerImagen = async(req, res) => {

    console.log(req.params.id);

    const nombreArchivo = req.params.id + '.jpg'; 
    if (nombreArchivo) {
        const pathImagen = path.join( __dirname, '../uploads', 'imgs', nombreArchivo );
        console.log(pathImagen);
        if ( fs.existsSync( pathImagen ) ) {
            return res.sendFile( pathImagen )
        }
    }
    const pathImagen = path.join( __dirname, '../assets/no-image.jpg');
    res.sendFile( pathImagen );
}



module.exports = {
    cargarArchivo,
    actualizarImagen,
    obtenerImagen,
    borrarImagen
}