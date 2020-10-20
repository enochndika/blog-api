const expressJwt = require("express-jwt");
const jwt = require("jwt-decode");

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
});

exports.adminRessource = (req, res, next) => {
  const token = req.headers.authorization;
  const data = token ? jwt(token) : null;
  if (data.role === "king") {
    return next();
  } else {
    res.status(401).json({ message: "Accès interdit" });
  }
};
