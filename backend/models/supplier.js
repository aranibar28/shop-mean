const { Schema, model } = require("mongoose");

const SupplierSchema = Schema({
  company:    { type: String, required: true },
  ruc:        { type: String, required: true },
  manager:    { type: String, required: true },
  dni:        { type: String, required: false },
  direction:  { type: String, required: false },
  phone:      { type: String, required: false },
  email:      { type: String, required: false },
  created_by: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  created_at: { type: Date, required: true, default: Date.now },
});

SupplierSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Supplier", SupplierSchema);
