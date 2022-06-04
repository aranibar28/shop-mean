const { check, validationResult } = require("express-validator");

const validateLogin = [
  check("email", "El email es obligatorio.").isEmail(),
  check("password", "El password es obligatorio.").not().isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateUser = [
  check("first_name", "El nombre es obligatorio.").not().isEmpty(),
  check("last_name", "El apellido es obligatorio.").not().isEmpty(),
  check("email", "El email es obligatorio.").isEmail(),
  check("password", "El password es obligatorio.").not().isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateCategory = [
  check("title", "El título es obligatorio.").not().isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateProdcut = [
  check("title", "El título es obligatorio.").not().isEmpty(),
  check("category", "El id de la categoría tiene que ser válido.").isMongoId(),
  check("price", "El precio es obligatorio.").not().isEmpty(),
  check("stock", "El stock es obligatorio.").not().isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    res.status(403).json({ errors: err.mapped() });
  }
};

module.exports = {
  validateLogin,
  validateUser,
  validateCategory,
  validateProdcut,
};
