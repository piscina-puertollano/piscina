const { validationResult } = require('express-validator');

/**
 * @author: badr
 */

const validateFilds = ( req, res, next ) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();
}

const checkDiferenceAsign = (req, res, next) => {
    const { id_tutor, id_socio } = req.body;

    if (id_socio.includes(id_tutor)) {
      return res.status(400).json({ error: 'Un tutor no se puede asignarse a si mismo' });
    }
  
    next();
}

module.exports = {
    validateFilds,
    checkDiferenceAsign
}