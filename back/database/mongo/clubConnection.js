const clubModel = require("../../models/mongo/clubModel");

class ClubConnection{


    constructor(){}

    allClubs = async ()=>{
        let resClub = 0
        try{
            resClub = await clubModel.find();
            console.log(resClub)
        }catch(error){
            console.log(error)
            throw new Error(error)
        }finally{
            return resClub
        }
    }
}

module.exports = ClubConnection

