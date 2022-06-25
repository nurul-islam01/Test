const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

exports.createUser = (req, res) => {
  const { name, email, password, role } = req.body;
  if (!(name && email && password && role))
    return res.status(400).send({
      message: "Bad request",
    });

  const user = new User({
    name,
    email,
    password,
  });

  user.save((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    Role.findOne({ name: role }, (err, role) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      user.role = [role._id];
      user.save((err) => {
        if (err) {
          return res.status(500).send({ message: err });
        }

        return res.send({
          message: "User was registered successfully!",
          user,
        });
      });
    });
  });
};

exports.udpateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(202).send(user);
  } catch (err) {
    res.status(304).send({ message: "Updated failed" });
  }
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;

  User.findById(id).exec(function (err, user) {
    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    }

    if (!user) {
      res.status(404).send({
        message: "This user not found",
      });
      return;
    }
    user.delete();
    res.status(202).send({
      message: "Deleted successfully, id: " + id,
    });
  });
};
