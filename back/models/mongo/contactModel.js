const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    id: { type: Number},
    contact: {type: String},
    tag:{ type: String}
}, { collection: process.env.MONGO_TABLE_CONTACT , versionKey: false });

const contactModel = mongoose.model(process.env.MONGO_TABLE_CONTACT, contactSchema);

module.exports = contactModel;