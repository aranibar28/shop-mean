const { Schema, model } = require("mongoose");

const CartSchema = Schema({
    product:   { type: Schema.Types.ObjectId, ref: "Product", required: true },
    customer:  { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    quantity:  { type: Number, required: true },
    variety:   { type: String, required: true },
    created_at: { type: Date, required: true, default: Date.now },
});

CartSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Cart", CartSchema);
