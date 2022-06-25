const { authJwt } = require("../middlewares");
const {
  create,
  getCar,
  update,
  deleteCar,
} = require("../controllers/car.controller");
const express = require("express"),
  router = express.Router();

router.post("/", [authJwt.verifyToken, authJwt.isManager], create);
router.get("/", [authJwt.verifyToken, authJwt.isManager], getCar);
router.get("/:id", authJwt.verifyToken, getCar);
router.patch("/:id", [authJwt.verifyToken, authJwt.isManager], update);
router.delete("/:id", [authJwt.verifyToken, authJwt.isManager], deleteCar);

module.exports = router;
