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

module.exports = {
    validateFilds
}