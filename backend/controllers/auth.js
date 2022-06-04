const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/users");
const Customer = require("../models/customer");
var jwt = require("../helpers/jwt");

const login_admin = async (req, res = response) => {
  let { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "El email no existe." });
    }

    var valid_password = bcrypt.compareSync(password, user.password);
    if (!valid_password) {
      return res.status(404).json({ msg: "El password no es válido." });
    }

    const token = jwt.createToken(user);

    res.json({ data: user, token });
  } catch (error) {
    res.status(500).json({ msg: "Error inesperado..." });
  }
};

const login_public = async (req, res = response) => {
  let { email, password } = req.body;

  try {
    let user = await Customer.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "El email no existe." });
    }

    var valid_password = bcrypt.compareSync(password, user.password);
    if (!valid_password) {
      return res.status(404).json({ msg: "El password no es válido." });
    }

    const token = jwt.createToken(user);

    res.json({ data: user, token });
  } catch (error) {
    res.status(500).json({ msg: "Error inesperado..." });
  }
};

const renewToken = async (req, res = response) => {
  const id = req.id;

  // Generar Token - JWT
  const token = await generateJWT(id);

  // Obtener el usuario por ID
  const user = await User.findById(id);

  res.json({
    ok: true,
    token,
    user,
  });
};

module.exports = {
  login_admin,
  login_public,
  renewToken,
};
