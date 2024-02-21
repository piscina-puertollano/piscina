const generateRandPass = () => {
    return Math.random().toString(36).slice(-8);
}

const checkExistUser = () =>{
    
}

module.exports = {
    generateRandPass
}