const { response } = require("express");
const Review = require("../models/review");

const read_review_customer = async (req, res = response) => {
  let id = req.params["id"];
  let reg = await Review.find({ customer: id })
    .sort({ created_at: -1 })
    .populate("customer", "first_name last_name email")
    .populate("product", "title slug image");
  res.status(200).send({ data: reg });
};

const read_review_product = async (req, res = response) => {
  let id = req.params["id"];
  let reg = await Review.find({ product: id })
    .sort({ created_at: -1 })
    .populate("customer", "first_name last_name email")
    .populate("product", "title slug image");
  res.status(200).send({ data: reg });
};

const send_review_product = async (req, res = response) => {
  let data = req.body;
  let reg = await Review.create(data);
  res.status(200).send({ data: reg });
};

module.exports = {
  read_review_customer,
  read_review_product,
  send_review_product,
};
