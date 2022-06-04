const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  title:         { type: String, required: true },
  slug:          { type: String, required: true },
  price:         { type: Number, required: true },
  stock:         { type: Number, required: true },
  image:         { type: String, required: false, default: "default.png" },
  description:   { type: String, required: false },
  container:     { type: String, required: false },
  title_variety: { type: String, required: false },
  items_variety: { type: Object, required: false, default: [] },
  galery:        { type: Object, required: false, default: [] },
  num_sales:     { type: Number, required: true, default: 0 },
  num_point:     { type: Number, required: true, default: 0 },
  status:        { type: Boolean, required: true, default: false },
  category:      { type: Schema.Types.ObjectId, required: true, ref: "Category" },
  created_by:    { type: Schema.Types.ObjectId, required: true, ref: "User" },
  created_at:    { type: Date, required: true, default: Date.now },
});

ProductSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Product", ProductSchema);