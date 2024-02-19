const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
    id: { type: Number},
    title: { type: String },
    history: { type: Object },
    estructura: {type: Object},
    tag: {type: String},
    order: {type: String},
    ubicacion: {
        direccion: String,
        mapa: String
    }

}, { collection: process.env.MONGO_TABLE_CLUB , versionKey: false });

const clubModel = mongoose.model(process.env.MONGO_TABLE_CLUB, clubSchema);

module.exports = clubModel;

