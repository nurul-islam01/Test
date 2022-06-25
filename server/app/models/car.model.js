const mongoose = require("mongoose"),
  { Schema } = mongoose;

const Card = new Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
});
