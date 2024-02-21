const contactModel = require("../../models/mongo/contactModel");


class ContactConnection{


    constructor(){}

    allContact = async ()=>{
        let resClub = 0
        try{
            resClub = await contactModel.find();

        }catch(error){
            throw new Error(error)
        }finally{
            return resClub
        }
    }

    showByTag = async (tag)=>{
        let resClub = 0
        try{
            resClub = await contactModel.findOne( { tag: tag });
        }catch(error){
            throw new Error(error)
        }finally{
            return resClub
        }
    }

    updateById = async (id, updateObj)=>{
        let resClub = 0
        try{
            resClub = await contactModel.findOneAndUpdate(
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

    deleteById = async (id)=>{
        let resClub = 0
        try{
            resClub = await contactModel.findOneAndDelete({ _id: id });
        }catch(error){
            throw new Error(error)
        }finally{
            return resClub
        }
    }

    
}

module.exports = ContactConnection

