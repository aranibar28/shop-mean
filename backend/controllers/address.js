"use strict";
const { response } = require("express");
const Address = require("../models/address");

const create_address = async (req, res = response) => {
  let data = req.body;
  try {
    if (data.principal) {
      let address = await Address.find({ customer: data.customer });
      address.forEach(async (element) => {
        await Address.findByIdAndUpdate({ _id: element._id }, { principal: false });
      });
    }
    let reg = await Address.create(data);
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(400).send({ data: undefined });
  }
};

const read_address = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let address = await Address.find({ customer: id }).populate("customer").sort({ created_at: -1 });
    res.status(200).send({ data: address });
  } catch (error) {
    res.status(200).send({ data: undefined });
  }
};

const update_address = async (req, res = response) => {
  let id = req.params["id"];
  let customer = req.params["customer"];
  try {
    let address = await Address.find({ customer: customer });

    address.forEach(async (element) => {
      await Address.findByIdAndUpdate({ _id: element._id }, { principal: false });
    });

    await Address.findByIdAndUpdate({ _id: id }, { principal: true });

    res.status(200).send({ data: true });
  } catch (error) {
    res.status(400).send({ data: undefined });
  }
};

const delete_address = async (req, res = response) => {
  let id = req.params["id"];
  let address = await Address.findByIdAndDelete({ _id: id });
  res.status(200).send({ data: address });
};

const principal_address = async (req, res = response) => {
  let id = req.params["id"];
  let address = undefined;
  try {
    address = await Address.findOne({ customer: id, principal: true });
    if (address == undefined) {
      res.status(200).send({ data: undefined });
    } else {
      res.status(200).send({ data: address });
    }
  } catch (error) {
    res.status(400).send({ data: undefined });
  }
};

module.exports = {
  create_address,
  read_address,
  update_address,
  delete_address,
  principal_address,
};
