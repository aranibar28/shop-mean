const { Schema, model } = require("mongoose");

var AddressSchema = Schema({
  customer:  { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  receptor:  { type: String, required: true },
  dni:       { type: String, required: true },
  address:   { type: String, required: true },
  phone:     { type: String, required: true },
  zip:       { type: String, required: true },
  country:   { type: String, required: true },
  region:    { type: String, required: false },
  province:  { type: String, required: false },
  district:  { type: String, required: false },
  principal: { type: Boolean, required: true },
  created_at: { type: Date, required: true, default: Date.now },
});

AddressSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Address", AddressSchema);
