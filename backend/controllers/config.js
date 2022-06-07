const { response } = require("express");
const Contact = require("../models/contact");
const Sales = require("../models/sale");

const get_messages_admin = async (req, res = response) => {
  let reg = await Contact.find().sort({ created_at: -1 });
  res.status(200).send({ data: reg });
};

const close_message_admin = async (req, res = response) => {
  let id = req.params["id"];
  let reg = await Contact.findByIdAndUpdate({ _id: id }, { status: "Cerrado" });
  res.status(200).send({ data: reg });
};

const get_sales_admin = async (req, res = response) => {
  let sales = [];
  let from = req.params["from"];
  let to = req.params["to"];

  if (from == "undefined" && to == "undefined") {
    sales = await Sales.find().populate("customer").populate("address").sort({ created_at: -1 });
    res.status(200).send({ data: sales });
  } else {
    let tt_from = Date.parse(new Date(from + "T00:00:00")) / 1000;
    let tt_to = Date.parse(new Date(to + "T00:00:00")) / 1000;
    let tem_sales = await Sales.find().populate("customer").populate("address").sort({ created_at: -1 });

    for (var item of tem_sales) {
      var tt_created = Date.parse(new Date(item.created_at)) / 1000;
      if (tt_created >= tt_from && tt_created <= tt_to) {
        sales.push(item);
      }
    }
    res.status(200).send({ data: sales });
  }
};

// KPI
const kpi_mounth_earnings = async (req, res = response) => {
  var january = 0;
  var february = 0;
  var march = 0;
  var april = 0;
  var may = 0;
  var june = 0;
  var july = 0;
  var august = 0;
  var september = 0;
  var october = 0;
  var november = 0;
  var december = 0;

  var total_earnings = 0;
  var total_earnings_before_month = 0;
  var count_sales_before_month = 0;
  var total_earnings_month = 0;
  var count_sales = 0;

  var reg = await Sales.find();
  let current_date = new Date();
  let current_year = current_date.getFullYear();
  let current_month = current_date.getMonth() + 1;

  for (var item of reg) {
    let created_at = new Date(item.created_at);
    let month = created_at.getMonth() + 1;

    if (created_at.getFullYear() == current_year) {
      if (month == 1) {
        january = january + item.subtotal;
      } else if (month == 2) {
        february = february + item.subtotal;
      } else if (month == 3) {
        march = march + item.subtotal;
      } else if (month == 4) {
        april = april + item.subtotal;
      } else if (month == 5) {
        may = may + item.subtotal;
      } else if (month == 6) {
        june = june + item.subtotal;
      } else if (month == 7) {
        july = july + item.subtotal;
      } else if (month == 8) {
        august = august + item.subtotal;
      } else if (month == 9) {
        september = september + item.subtotal;
      } else if (month == 10) {
        october = october + item.subtotal;
      } else if (month == 11) {
        november = november + item.subtotal;
      } else if (month == 12) {
        december = december + item.subtotal;
      }

      if (month == current_month - 1) {
        total_earnings_before_month = total_earnings_before_month + item.subtotal;
        count_sales_before_month = count_sales_before_month + 1;
      }

      if (month == current_month) {
        total_earnings_month = total_earnings_month + item.subtotal;
        count_sales = count_sales + 1;
      }

      total_earnings = total_earnings + item.subtotal;
    }
  }
  res.status(200).send({
    january,
    february,
    march,
    april,
    may,
    june,
    july,
    august,
    september,
    october,
    november,
    december,
    count_sales,
    total_earnings,
    total_earnings_month,
    total_earnings_before_month,
    count_sales_before_month,
  });
};

module.exports = {
  get_messages_admin,
  close_message_admin,
  get_sales_admin,
  kpi_mounth_earnings,
};
