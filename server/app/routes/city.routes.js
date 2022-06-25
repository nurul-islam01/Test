const { authJwt } = require("../middlewares");
const {
  createCity,
  getCity,
  update,
  deleteCity,
} = require("../controllers/city.controller");
const express = require("express"),
  router = express.Router();

router.post("/", [authJwt.verifyToken, authJwt.isManager], createCity);
router.get("/", authJwt.verifyToken, getCity);
router.get("/:id", [authJwt.verifyToken, authJwt.isManager], getCity);

router.patch("/:id", [authJwt.verifyToken, authJwt.isManager], update);
router.delete("/:id", [authJwt.verifyToken, authJwt.isManager], deleteCity);

module.exports = router;
