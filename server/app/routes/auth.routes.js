const { authJwt } = require("../middlewares");
const { signin, signout } = require("../controllers/auth.controller");
const express = require("express"),
  router = express.Router();

router.post("/signin", signin);
router.get("/signout", authJwt.verifyToken, signout);

module.exports = router;
