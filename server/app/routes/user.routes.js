const { verifySignUp, authJwt } = require("../middlewares");
const {
  createUser,
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

router.patch("/:id", [authJwt.verifyToken, authJwt.isManager], udpateUser);

router.delete("/:id", [authJwt.verifyToken, authJwt.isManager], deleteUser);

module.exports = router;
