const db = require("../models");

const Car = db.car;

exports.create = (req, res) => {
  const { name, number, user } = req.body;
  if (!number) {
    res.status(400).send({
      message: "Bad request, car number is required",
    });
    return;
  }

  const car = new Car({
    name,
    number,
    user,
  });

  car.save(function (err, cr) {
    if (err) {
      res.status(500).send({ message: "Saved failed" });
      return;
    }
    if (cr) {
      res.status(201).send({ data: cr });
      return;
    }
    res.status(505).send({ message: "Something went wrong." });
  });
};

exports.getCar = (req, res) => {
  const { id } = req.params;
  if (id) {
    Car.findById(id)
      .populate("user", "-__v")
      .exec((err, car) => {
        if (err) {
          res.status(500).send({ message: "getting failed" });
          return;
        }
        if (car) {
          res.status(200).send({ data: car });
          return;
        }
        res.status(505).send({ message: "Something went wrong." });
      });

    return;
  }

  Car.find()
    .populate("user", "-__v")
    .exec((err, cars) => {
      if (err) {
        res.status(500).send({ message: "getting failed" });
        return;
      }
      if (cars) {
        res.status(200).send({ data: cars });
        return;
      }
      res.status(505).send({ message: "Something went wrong." });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send({
      message: "Bad request",
    });
    return;
  }
  Car.findByIdAndUpdate(id, req.body, { new: true }).exec((err, car) => {
    if (err) {
      res.status(500).send({
        message: "Updating failed",
        error: err,
      });
      return;
    }

    res.status(202).send({
      data: car,
    });
  });
};

exports.deleteCar = (req, res) => {
  const { id } = req.params;

  Car.findById(id).exec((err, car) => {
    if (err) {
      res.status(505).send({
        message: "Deleteing faild.",
      });
      return;
    }
    if (!car) {
      res.status(404).send({
        message: "Car not found",
      });
      return;
    }
    if (car) {
      car.delete();
      res.status(202).send({
        messsage: "Car deleted : " + id,
      });
      return;
    }

    res.status(500).send({
      message: "Something went wrong",
    });
  });
};
