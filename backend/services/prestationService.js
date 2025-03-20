const Prestation = require("../models/Prestation");
const mongoose = require("mongoose");


const getPrestationsByIds = async (ids) => {
  try {
    return await Prestation.find({ _id: { $in: ids } });
  } catch (error) {
    console.error("Erreur lors de la récupération des prestations:", error);
    throw error;
  }
};

const getPrixRecentPrestation = async (id) => {
  try {
    const prestation = await Prestation.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      { $project: { dernierTarif: { $arrayElemAt: ["$tarifs.montant", -1] } } }
    ]);

    return prestation.length > 0 ? prestation[0].dernierTarif || 0 : 0;
  } catch (error) {
    console.error("Erreur lors de la récupération du prix récent:", error);
    return 0;
  }
};


module.exports = { getPrestationsByIds, getPrixRecentPrestation };
