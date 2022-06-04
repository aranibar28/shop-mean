"use strict";
const { response } = require("express");
const Supplier = require("../models/supplier");

const create_supplier = async (req, res = response) => {
  let data = req.body;
  data.created_by = req.id;
  try {
    let reg = await Supplier.create(data);
    res.status(200).json({ data: reg });
  } catch (error) {
    res.status(200).json({ data: "undefined" });
  }
};

const read_suppliers = async (req, res = response) => {
  let filter = req.params["filter"];
  try {
    let reg = await Supplier.find({ company: new RegExp(filter, "i") }).sort({ created_at: -1 });
    res.status(200).json({ data: reg });
  } catch (error) {
    res.status(200).json({ data: undefined });
  }
};

const read_supplier_by_id = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Supplier.findById(id);
    res.status(200).json({ data: reg });
  } catch (error) {
    res.status(200).json({ data: undefined });
  }
};

const update_supplier = async (req, res = response) => {
  let id = req.params["id"];
  let data = req.body;
  try {
    let reg = await Supplier.findByIdAndUpdate(id, data);
    res.status(200).json({ data: reg });
  } catch (error) {
    res.status(200).json({ data: undefined });
  }
};

const delete_supplier = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Supplier.findByIdAndDelete(id);
    res.status(200).json({ data: reg });
  } catch (error) {
    res.status(200).json({ data: undefined });
  }
};

module.exports = {
  create_supplier,
  read_suppliers,
  read_supplier_by_id,
  update_supplier,
  delete_supplier,
};
