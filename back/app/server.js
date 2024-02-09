
const express = require('express');
// const body_parser = require('body-parser');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.userRoutePath = '/api';
        this.eventosRoutePath = '/api/eventos';
        this.categoriasRoutePath = '/api/categorias';
        this.noSociosRoutePath = '/api/noSocios';
        this.eventoUsuariosRoutePath = '/api/eventoUsuarios';

        this.middlewares();
        this.routes(); 
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        //this.app.use(this.userRoutePath , require('../routes/userRoutes'));
        this.app.use(this.eventosRoutePath , require('../routes/eventoRoutes'));
        this.app.use(this.categoriasRoutePath , require('../routes/categoriaRoutes'));
        this.app.use(this.noSociosRoutePath , require('../routes/noSocioRoutes'));
        this.app.use(this.eventoUsuariosRoutePath , require('../routes/eventoUsuarioRoutes'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
    }
}

module.exports = Server;