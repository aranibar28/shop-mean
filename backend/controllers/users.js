const { response } = require("express");
const { generateJWT } = require("../helpers/jwt");
const User = require("../models/users");
const bcrypt = require("bcryptjs");

const create_user = async (req, res = response) => {
  let { email, password } = req.body;
  try {
    var exist_email = await User.findOne({ email });
    if (exist_email) {
      return res.status(403).json({ msg: "Este correo ya existe." });
    }

    req.body.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
    let reg = await User.create(req.body);

    res.json({ data: reg });
  } catch (error) {
    res.json({ data: undefined });
  }
};

const read_users = async (req, res = response) => {
  let reg = await User.find();
  res.json({ data: reg });
};

const read_user_by_id = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await User.findById(id);
    res.json({ data: reg });
  } catch (error) {
    res.json({ data: undefined });
  }
};

const update_user = async (req, res = response) => {
  let id = req.params["id"];
  let user = await User.findById(id);
  const { email, password, ...data } = req.body;

  // Validar que email del User sea diferente
  if (user.email !== email) {
    var exist_email = await User.findOne({ email });
    if (exist_email) {
      return res.status(403).json({ msg: "Este correo ya existe." });
    } else {
      data.email = email;
    }
  }

  // Encriptación de una nueva contraseña
  if (user.password != password) {
    var new_password = bcrypt.hashSync(password, bcrypt.genSaltSync());
    data.password = new_password;
  } else {
    data.password = password;
  }

  // Actualizar User
  let reg = await User.findByIdAndUpdate(id, data, { new: true });
  res.json({ data: reg });
};

const delete_user = async (req, res = response) => {
  let id = req.params["id"];
  let reg = await User.findByIdAndDelete(id);
  res.json({ data: reg });
};

module.exports = {
  create_user,
  read_users,
  read_user_by_id,
  update_user,
  delete_user,
};
