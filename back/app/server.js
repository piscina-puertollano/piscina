const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.userRoutePath = '/api';
        this.userRouteClasesPath = '/api';

        this.middlewares();
        this.routes(); 
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.userRouteClasesPath , require('../routes/claseRoutes'));

         this.app.use(this.userRoutePath, require('../routes/userRoutes'));
         this.app.use(this.userRoutePath, require('../routes/entrenamientosRoutes'));
        this.app.use(this.userRoutePath, require('../routes/puntuacionRoutes'));

    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
    }
}

module.exports = Server;
