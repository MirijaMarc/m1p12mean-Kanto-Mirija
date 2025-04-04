const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (utilisateur) => {
  const utilisateurDTO = {
    id: utilisateur._id,
    nom: utilisateur.nom,
    email: utilisateur.email,
    role: utilisateur.role,
  }

  return jwt.sign(
    { utilisateur: utilisateurDTO },
    process.env.JWT_SECRET,
    { expiresIn: "24h" });
};

const decodeToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken.utilisateur.id;
  } catch (error) {
    throw new Error("Token invalide ou expiré");
  }
};

const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ statut: "error", message: "Vous devez vous connecter" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ statut: "error", message: "Token invalide" });
      }

      if (!decoded.utilisateur.role.some(r => allowedRoles.includes(r.id))) {
        return res
          .status(403)
          .json({ statut: "error", message: "Accès refusé" });
      }

      req.user = decoded;
      next();
    });
  };
};

module.exports = { generateToken, decodeToken, verifyRole };
