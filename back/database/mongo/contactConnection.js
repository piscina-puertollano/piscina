const contactModel = require("../../models/mongo/contactModel");

/**
 * @author: badr
 */

class ContactConnection{


    constructor(){}

    allContact = async ()=>{
        let resClub = 0
        try{
            resClub = await contactModel.find({});

        }catch(error){
            throw new Error(error)
        }finally{
            return resClub
        }
    }

    createNewConctact = async (body)=>{
        let resClub = 0
        try{
            resClub = await contactModel.create(body);

        }catch(error){
            throw new Error(error)
        }finally{
            return resClub
        }
    }

    showById = async (contactId)=>{
        let resClub = 0
        try{
            resClub = await contactModel.findById(contactId);
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

