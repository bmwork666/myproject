const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers["authorization"];

  if (!token)
    return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token.split(" ")[1], "SECRET_KEY_123");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
