const { Schema, model } = require("mongoose");

const CouponSchema = Schema({
  code:       { type: String, required: true },
  type:       { type: String, required: true },
  value:      { type: Number, required: true },
  limit:      { type: Number, required: true },
  created_by: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  created_at: { type: Date, required: true, default: Date.now },
});

CouponSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Coupon", CouponSchema);