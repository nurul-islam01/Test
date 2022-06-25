const mongoose = require("mongoose"),
  { Schema } = mongoose;

const Car = new Schema({
  name: { type: String, required: true },
  number: { type: String, required: true, unique: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Car", Car);
