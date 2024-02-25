const path = require('path');
const fs   = require('fs');
const { subirArchivo } = require('../helpers/upload-files');


const uploadFile = async(req, res) => {
    try {
        const folder = req.header('folder')
        if(!folder){
            res.status(404).json("La carpeta de destino no está definida");
            return;
        }
        
        if(!req.files || Object.keys(req.files).length === 0){
            res.status(404).json("No hay archivos para subir");
            return;
        }

        if(!req.files.archivo){
            res.status(404).json("No hay archivos para subir");
            return;
        }

        const nombre = await subirArchivo( req.files, undefined, folder );
        res.json({ nombre });


    } catch (msg) {
        res.status(400).json({ msg });
    }

}


const destroyFile = async(req, res ) => {

    const  fileId = req.params.id;
    const folder = req.params.folder;

    const pathImagen = path.join( __dirname, '../uploads', folder, fileId);
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


const showFile = async(req, res) => {

    console.log(req.params.id);

    const fileId = req.params.id
    const folder = req.body.folder;

    if (fileId) {
        const pathFile = path.join( __dirname, '../uploads', folder, fileId );
        console.log(pathFile);
        if ( fs.existsSync( pathFile ) ) {
            return res.sendFile( pathFile )
        }
    }
    const pathFile = path.join( __dirname, '../uploads/no-image.jpg');
    res.sendFile( pathFile );
}


module.exports = {
    uploadFile,
    actualizarImagen,
    showFile,
    destroyFile
}