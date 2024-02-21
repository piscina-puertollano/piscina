
const getSocket = (req, res,next) =>{
    req.io = io
    next(req)
}

module.exports = {
    getSocket
}