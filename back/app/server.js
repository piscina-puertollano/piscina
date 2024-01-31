const express = require('express');
// const body_parser = require('body-parser');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.userRoutePath = '/api';

        this.middlewares();
        this.routes(); 
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.userRoutePath , require('../routes/userRoutes'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
    }
}

module.exports = Server;