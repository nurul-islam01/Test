const db = require("../models");

const City = db.city;

exports.createCity = (req, res) => {
  const { name, location, car, user } = req.body;

  if (!location) {
    if (!number) {
      res.status(400).send({
        message: "Bad request, car number is required",
      });
      return;
    }
  }

  const city = new City({
    name,
    location,
    car,
    user,
  });

  city.save((err, cit) => {
    if (err) {
      res.status(500).send({ message: "Saved failed" });
      return;
    }

    if (res) {
      res.status(201).send({ data: cit });
      return;
    }

    res.status(505).send({ message: "Something went wrong." });
  });
};

exports.getCity = (req, res) => {
  const { id } = req.params;
  if (id) {
    City.findById(id)
      .populate("car", "-__v")
      .populate("user", "-__v")
      .exec((err, city) => {
        if (err) {
          res.status(500).send({ message: "Error happen", error: err });
          return;
        }
        if (!city) {
          res.status(404).send({ message: "City not found" });
          return;
        }

        if (city) {
          res.status(200).send({ data: city });
          return;
        }

        res.status(505).send({ message: "Something went wrong." });
      });
    return;
  }

  City.find()
    .populate("car", "-__v")
    .populate("user", "-__v")
    .exec((err, cities) => {
      if (err) {
        res.status(500).send({ message: "getting failed" });
        return;
      }
      if (cities) {
        res.status(200).send({ data: cities });
        return;
      }
      res.status(505).send({ message: "Something went wrong." });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;

  City.findByIdAndUpdate(id, { ...req.body }, { new: true }).exec(
    (err, city) => {
      if (err) {
        res.status(500).send({ message: "update failed" });
        return;
      }

      if (res) {
        res.status(201).send({ data: city });
        return;
      }

      res.status(505).send({ message: "Something went wrong." });
    }
  );
};

exports.deleteCity = (req, res) => {
  const { id } = req.params;

  City.findById(id).exec((err) => {
    if (err) {
      res.status(500).send({ message: "delete failed" });
      return;
    }
    es.status(201).send({ message: "Deleted successfully" });
  });
};
