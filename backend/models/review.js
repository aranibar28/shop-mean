const { Schema, model } = require("mongoose");

const ReviewSchema = Schema({
  product:    { type: Schema.Types.ObjectId, ref: "Product", required: true },
  customer:   { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  sale:       { type: Schema.Types.ObjectId, ref: "Sale", required: true },
  review:     { type: String, required: true },
  starts:     { type: Number, required: true },
  created_at: { type: Date, required: true, default: Date.now },
});

ReviewSchema.method("toJSON", function () {
    const { __v, ...object } = this.toObject();
    return object;
  });
  
  module.exports = model("Review", ReviewSchema);