const { Schema, model } = require("mongoose");

const ContactSchema = Schema({
  customer:   { type: String, required: true },
  subject:    { type: String, required: true },
  message:    { type: String, required: true },
  email:      { type: String, required: true },
  phone:      { type: String, required: true },
  status:     { type: String, required: true, default: "Abierto" },
  created_at: { type: Date, required: true, default: Date.now },
});

ContactSchema.method("toJSON", function () {
    const { __v, ...object } = this.toObject();
    return object;
  });
  
  module.exports = model("Contact", ContactSchema);