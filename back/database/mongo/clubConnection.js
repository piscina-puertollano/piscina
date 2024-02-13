const clubModel = require("../../models/mongo/clubModel");

class ClubConnection{


    constructor(){}

    allSections = async ()=>{
        let resClub = 0
        try{
            resClub = await clubModel.find();
        }catch(error){
            throw new Error(error)
        }finally{
            return resClub
        }
    }

    showByTag = async (tag)=>{
        let resClub = 0
        try{
            resClub = await clubModel.findOne( { tag: tag });
        }catch(error){
            throw new Error(error)
        }finally{
            return resClub
        }
    }

    updateById = async (id, updateObj)=>{
        let resClub = 0
        try{
            resClub = await clubModel.findOneAndUpdate(
                { _id: id }, 
                updateObj,
                { new: true } 
              );
        }catch(error){
            throw new Error(error)
        }finally{
            return resClub
        }
    }
}

module.exports = ClubConnection

