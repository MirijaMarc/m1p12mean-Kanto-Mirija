const Prestation = require("../models/Prestation");

const getPrestationsByIds = async (ids) => {
  try {
    return await Prestation.find({ _id: { $in: ids } });
  } catch (error) {
    console.error("Erreur lors de la récupération des prestations:", error);
    throw error;
  }
};

module.exports = { getPrestationsByIds };
