const Conexion = require('../database/UserConnection');

const exitUser = (id_user) => {
    console.log('llego')
    return new Promise((resolve, reject) => {
        const conx = new Conexion();
        conx.getUserById(id_user)
            .then(msg => {
                console.log(msg)
                console.log('Existe');
                resolve(true);
            })
            .catch(err => {
                console.log(err)
                console.log('No existe');
                reject(new Error('Este usuario no existe'));

            });
    });
};

module.exports = {
    exitUser
}