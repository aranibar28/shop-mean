const { response } = require("express");
const Product = require("../models/product");
const Inventory = require("../models/inventory");

const read_inventory = async (req, res = response) => {
  let id = req.params["id"];
  let reg = await Inventory.find({ product: id }).populate("created_by", "email").populate("supplier", "company").sort({ created_at: -1 });
  res.status(200).send({ data: reg });
};

const register_stock = async (req, res = response) => {
  let data = req.body;
  data.created_by = req.id;
  let inventory = await Inventory.create(data);
  let product = await Product.findById({ _id: inventory.product });
  var new_stock = parseInt(product.stock) + parseInt(inventory.quantity);

  // Actualización stock producto
  let reg = await Product.findOneAndUpdate({ _id: inventory.product }, { stock: new_stock });
  res.status(200).send({ data: reg });
};

const remove_stock = async (req, res = response) => {
  let id = req.params["id"];
  let inventory = await Inventory.findOneAndRemove({ _id: id });
  let product = await Product.findById({ _id: inventory.product });
  var new_stock = parseInt(product.stock) - parseInt(inventory.quantity);

  // Actualización stock producto
  let reg = await Product.findOneAndUpdate({ _id: inventory.product }, { stock: new_stock });
  res.status(200).send({ data: reg });
};

module.exports = {
  read_inventory,
  register_stock,
  remove_stock,
};
