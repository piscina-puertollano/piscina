const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

class Server {

    constructor() {
        this.app = express();
        this.userRoutePath = '/api';
        this.userRouteClasesPath = '/api';
        this.eventosRoutePath = '/api/eventos';
        this.categoriasRoutePath = '/api/categorias';
        this.noSociosRoutePath = '/api/noSocios';
        this.eventoUsuariosRoutePath = '/api/eventoUsuarios';
        
        this.conectarMongoose();
    this.middlewares();
    this.routes();
  }

  conectarMongoose() {

    mongoose.connect('mongodb://' + process.env.DB_MONGO_URL + ':' + process.env.DB_MONGO_PORT + '/' + process.env.DB_MONGO_DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
    this.db.once('open', () => {console.log('Conexión exitosa a MongoDB');});
}

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

    routes(){
        this.app.use(this.userRouteClasesPath , require('../routes/claseRoutes'));

         this.app.use(this.userRoutePath, require('../routes/userRoutes'));
         this.app.use(this.userRoutePath, require('../routes/clubRoutes'));

         this.app.use(this.userRoutePath, require('../routes/entrenamientosRoutes'));
        this.app.use(this.userRoutePath, require('../routes/puntuacionRoutes'));

      
        this.app.use(this.eventosRoutePath , require('../routes/eventoRoutes'));
        this.app.use(this.categoriasRoutePath , require('../routes/categoriaRoutes'));
        this.app.use(this.noSociosRoutePath , require('../routes/noSocioRoutes'));
        this.app.use(this.eventoUsuariosRoutePath , require('../routes/eventoUsuarioRoutes'));
    }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Servidor escuchando en: ${process.env.PORT}`);
    });
  }
}

module.exports = Server;
