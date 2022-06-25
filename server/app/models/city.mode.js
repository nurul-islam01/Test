const mongoose = require("mongoose"),
  { Schema } = mongoose;

const City = new Schema({
  name: { type: String, required: true },
  location: { type: Object },
  car: [{ type: Schema.Types.ObjectId, ref: "Car" }],
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("City", City);
