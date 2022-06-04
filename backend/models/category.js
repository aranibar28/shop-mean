const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  title:       { type: String, required: true },
  icon:        { type: String, required: false, default: "" },
  description: { type: String, required: false, default: "" },
  image:       { type: String, required: false, default: "default.png" },
  created_by:  { type: Schema.Types.ObjectId, required: true, ref: "User" },
  created_at:  { type: Date, required: true, default: Date.now },
});

CategorySchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Category", CategorySchema);
