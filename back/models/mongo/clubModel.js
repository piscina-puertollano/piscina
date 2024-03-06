const mongoose = require('mongoose');
/**
 * @author: badr
 */

const clubSchema = new mongoose.Schema({
    id: { type: Number},
    title: { type: String },
    history: { type: Object },
    estructura: {type: Object},
    tag: {type: String},
    order: {type: String},
    assets: {type: Object},
    fotos: {type: Object},
    ubicacion: {
        direccion: String,
        mapa: String
    }

}, { collection: process.env.MONGO_TABLE_CLUB , versionKey: false });

const clubModel = mongoose.model(process.env.MONGO_TABLE_CLUB, clubSchema);

module.exports = clubModel;

