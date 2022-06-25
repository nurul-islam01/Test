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
          data: user,
        });
      });
    });
  });
};

exports.getUser = (req, res) => {
  const { id } = req.params;
  if (id) {
    User.findById(id)
      .populate("role", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: "Error happen", error: err });
          return;
        }
        if (!user) {
          res.status(404).send({ message: "User not found" });
          return;
        }

        if (res) {
          res.status(200).send({ data: user });
          return;
        }

        res.status(505).send({ message: "Something went wrong." });
      });
    return;
  }

  User.find()
    .populate("role", "-__v")
    .exec((err, users) => {
      if (err) {
        res.status(500).send({ message: "getting failed" });
        return;
      }
      if (users) {
        res.status(200).send({ data: users });
        return;
      }
      res.status(505).send({ message: "Something went wrong." });
    });
};

exports.udpateUser = (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).send({ message: "id not found" });
    return;
  }

  User.findByIdAndUpdate(id, req.body, { new: true }).exec((err, user) => {
    if (err) {
      res.status(304).send({ message: "Updated failed" });
      return;
    }
    res.status(202).send({ data: user });
  });
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
