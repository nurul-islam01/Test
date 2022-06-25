const { verifySignUp, authJwt } = require("../middlewares");
const {
  createUser,
  getUser,
  udpateUser,
  deleteUser,
} = require("../controllers/user.controller");
const express = require("express"),
  router = express.Router();

router.post(
  "/",
  [
    authJwt.verifyToken,
    authJwt.isManager,
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
  ],
  createUser
);

router.get("/", [authJwt.verifyToken, authJwt.isManager], getUser);
router.get("/:id", authJwt.verifyToken, getUser);

router.patch("/:id", [authJwt.verifyToken, authJwt.isManager], udpateUser);

router.delete("/:id", [authJwt.verifyToken, authJwt.isManager], deleteUser);

module.exports = router;
