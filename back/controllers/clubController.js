const {response,request} = require('express');
const ClubConnection = require('../database/mongo/clubConnection');
const clubModel = require('../models/mongo/clubModel');


const showClub = async (req, res) =>{
    console.log('llego')
    let resClub =  await clubModel.find();
    res.status(200).json(resClub)
 
}

module.exports = {
    showClub
}