const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.user = { ...decoded };
    next();
  });
};

const isManager = (req, res, next) => {
  const { role } = req.user;
  if (role !== "manager") {
    return res.status(403).send({ message: "Permission denied!" });
  }
  next();
};

module.exports = { verifyToken, isManager };
