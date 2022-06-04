const { response } = require("express");
const { generateJWT } = require("../helpers/jwt");
const Customer = require("../models/customer");
const bcrypt = require("bcryptjs");

const create_customer = async (req, res = response) => {
  let { email, password } = req.body;
  try {
    var exist_email = await Customer.findOne({ email });
    if (exist_email) {
      return res.status(403).json({ msg: "Este correo ya existe." });
    }

    req.body.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
    let reg = await Customer.create(req.body);

    res.json({ data: reg });
  } catch (error) {
    res.json({ data: undefined });
  }
};

const read_customers = async (req, res = response) => {
  let type = req.params["type"];
  let filter = req.params["filter"];

  if (type == null || type == "null") {
    let reg = await Customer.find();
    res.json({ data: reg });
  } else {
    if (type == "first_name") {
      let reg = await Customer.find({ first_name: new RegExp(filter, "i") });
      res.json({ data: reg });
    } else if (type == "last_name") {
      let reg = await Customer.find({ last_name: new RegExp(filter, "i") });
      res.json({ data: reg });
    } else if (type == "email") {
      let reg = await Customer.find({ email: new RegExp(filter, "i") });
      res.json({ data: reg });
    }
  }
};

const read_customer_by_id = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Customer.findById(id);
    res.json({ data: reg });
  } catch (error) {
    res.json({ data: undefined });
  }
};

const update_customer = async (req, res = response) => {
  let id = req.params["id"];
  let customer = await Customer.findById(id);
  const { email, password, ...data } = req.body;

  // Validar que email del Customer sea diferente
  if (customer.email !== email) {
    var exist_email = await Customer.findOne({ email });
    if (exist_email) {
      return res.status(403).json({ msg: "Este correo ya existe." });
    } else {
      data.email = email;
    }
  }

  // Encriptación de una nueva contraseña
  if (customer.password != password) {
    var new_password = bcrypt.hashSync(password, bcrypt.genSaltSync());
    data.password = new_password;
  } else {
    data.password = password;
  }

  // Actualizar Customer
  let reg = await Customer.findByIdAndUpdate(id, data, { new: true });
  res.json({ data: reg });
};

const delete_customer = async (req, res = response) => {
  let id = req.params["id"];
  let reg = await Customer.findByIdAndDelete(id);
  res.json({ data: reg });
};

module.exports = {
  create_customer,
  read_customers,
  read_customer_by_id,
  update_customer,
  delete_customer,
};
