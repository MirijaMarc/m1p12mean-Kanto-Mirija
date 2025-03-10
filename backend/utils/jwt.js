const jwt = require("jsonwebtoken");
require('dotenv').config();

const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

const decodeToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken.id; 
  } catch (error) {
    throw new Error('Token invalide ou expiré');
  }
};

module.exports = { generateToken, decodeToken };
