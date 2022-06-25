const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.car = require("./car.model");
db.city = require("./city.mode");

db.ROLES = ["operator", "manager"];

module.exports = db;
