const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const VALID_USERNAME = "adminDash";   // hardcoded
const VALID_PASSWORD = "12345";   // hardcoded

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ username }, "SECRET_KEY_123", { expiresIn: "1h" });

  res.json({ token });
});

module.exports = router;
