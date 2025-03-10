const jwt = require("jsonwebtoken");
require('dotenv').config();

const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

module.exports = { generateToken };
