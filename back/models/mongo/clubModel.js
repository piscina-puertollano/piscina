const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
    id: { type: Number},
    section: { type: String },
}, { collection: process.env.MONGO_TABLE_CLUB , versionKey: false });

const clubModel = mongoose.model('club', clubSchema);

module.exports = clubModel;