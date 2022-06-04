const { Schema, model } = require("mongoose");

const InventorySchema = Schema({
  quantity: { type: Number, required: true },
  product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
  supplier: { type: Schema.Types.ObjectId, required: true, ref: "Supplier" },
  created_by: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  created_at: { type: Date, required: true, default: Date.now },
});

InventorySchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Inventory", InventorySchema);
