const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");

exports.signin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({
      message: "Email and password is required",
    });
    return;
  }
  User.findOne({
    email,
  })
    .populate("role", "-__v")
    .exec((err, user) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.comparePassword(password, function (err, match) {
        if (err) return res.status(400).send({ message: err });
        if (!match) {
          return res.status(401).send({ message: "Password not match" });
        }

        if (match) {
          const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role.name },
            config.secret,
            {
              expiresIn: 84444444,
            }
          );

          req.session.token = token;

          res.status(200).send({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          });
        }
      });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
