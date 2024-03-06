const { Router } = require("express");
const controlador = require("../../controllers/landing/contactController");
const { check } = require("express-validator");
const { validateFilds, validateTLF } = require("../../middlewares/validators");
const {
  checkToken,
  tokenCanWebmaster,
} = require("../../middlewares/abilities");
const router = Router();

/**
 * @author: badr
 */

router.get("/contact", controlador.index);
router.get("/contact/:id", controlador.showContact);
router.post("/contact", [ checkToken, tokenCanWebmaster,
    check("name", "El nombre es obligatorio").notEmpty(),
    check("tlf", "El teléfono es obligatorio").notEmpty(),
    check("tlf", "El teléfono no tiene el formato correcto").custom(
      validateTLF
    ),
    check("email", "El email no puede estar vacío").notEmpty(),
    check("email", "No es un email").isEmail(),
    validateFilds,
  ],
  controlador.create);

router.put( "/contact/:id", [checkToken, tokenCanWebmaster], controlador.updateContact);

router.delete("/contact/:id", [checkToken, tokenCanWebmaster], controlador.deleteById);

module.exports = router;
