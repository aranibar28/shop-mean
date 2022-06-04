const { Schema, model } = require("mongoose");

const DiscountSchema = Schema({
  title:       { type: String, required: true },
  banner:      { type: String, required: true },
  discount:    { type: Number, required: true },
  start_date:  { type: String, required: true },
  finish_date: { type: String, required: true },
  created_at:  { type: Date, required: true, default: Date.now },
});

DiscountSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Discount", DiscountSchema);
