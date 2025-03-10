const Utilisateur = require("../models/Utilisateur");

const getUtilisateursByIds = async (ids) => {
  try {
    return await Utilisateur.find({ _id: { $in: ids } }).select("-motDePasse");
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    throw error;
  }
};

module.exports = { getUtilisateursByIds };
