const { Schema, model } = require("mongoose");

const SaleSchema = Schema({
  customer:       { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  address:        { type: Schema.Types.ObjectId, ref: "Address", required: true },
  code:           { type: String, required: true },
  subtotal:       { type: Number, required: true },
  type_delivery:  { type: String, required: true },
  price_delivery: { type: Number, required: true },
  transaction:    { type: String, required: true },
  payment_method: { type: String, required: false },
  discount:       { type: String, required: false },
  coupon:         { type: String, required: false },
  status:         { type: String, required: true },
  notes:          { type: String, required: false, default: "" },
  created_at:     { type: Date, required: true, default: Date.now },
});

SaleSchema.method("toJSON", function () {
    const { __v, ...object } = this.toObject();
    return object;
  });
  
  module.exports = model("Sale", SaleSchema);