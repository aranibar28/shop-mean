const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  first_name: { type: String, required: true },
  last_name:  { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  dni:        { type: String, required: false },
  genre:      { type: String, required: false, default: "" },
  image:      { type: String, required: false, default: "profile.png" },
  status:     { type: Boolean, required: true, default: false },
  role:       { type: String, required: true, default: "USER_ROLE" },
  created_at: { type: Date, required: true, default: Date.now },
});

UserSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("User", UserSchema);
