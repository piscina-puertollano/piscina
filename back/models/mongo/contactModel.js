const mongoose = require('mongoose');
/**
 * @author: badr
 */

const contactSchema = new mongoose.Schema({
    id: { type: Number},
    name: {type: String},
    tlf: {type: String},
    email: {type: String},
}, { collection: process.env.MONGO_TABLE_CONTACT , versionKey: false });

const contactModel = mongoose.model(process.env.MONGO_TABLE_CONTACT, contactSchema);

module.exports = contactModel;