const { Router } = require('express');
const mailController = require('../../controllers/services/mailController')
const router = Router();

router.post('/',mailController.sendContactMail)

module.exports = router