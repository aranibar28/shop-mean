const { Schema, model } = require("mongoose");

const CustomerSchema = Schema({
  first_name: { type: String, required: true },
  last_name:  { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  dni:        { type: String, required: false },
  phone:      { type: String, required: false },
  birthday:   { type: String, required: false },
  genre:     { type: String, required: false, default: "" },
  image:      { type: String, required: false, default: "profile.png" },
  created_at: { type: Date, required: true, default: Date.now },
});

CustomerSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Customer", CustomerSchema);