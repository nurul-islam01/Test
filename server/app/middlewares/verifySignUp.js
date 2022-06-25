const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    if (user) {
      return res
        .status(400)
        .send({ message: "Failed! email is already in use!" });
    }

    next();
  });
};

checkRolesExisted = (req, res, next) => {
  if (!ROLES.includes(req.body.role)) {
    return res.status(400).send({
      message: `Failed! Role ${req.body.role} does not exist!`,
    });
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
