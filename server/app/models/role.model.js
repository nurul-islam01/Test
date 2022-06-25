const mongoose = require("mongoose");

const { Schema } = mongoose;

const Role = new Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("Role", Role);
