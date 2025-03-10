const Intervention = require("../models/Intervention");
const { getPrestationsByIds } = require("./prestationService");
const { getUtilisateursByIds } = require("./utilisateurService");

const getInterventionDetails = async (id) => {
  try {
    const intervention = await Intervention.findById(id);
    if (!intervention) {
      throw new Error("Intervention non trouvée");
    }

    const labelStatut = Intervention.getLabelStatut(intervention.statut);
    const mecaniciens = await getUtilisateursByIds(intervention.mecaniciensId);
    const prestations = await getPrestationsByIds(intervention.prestationsId);

    return {
      ...intervention.toObject(),
      labelStatut,
      prestations,
      mecaniciens,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des details de l'intervention:", error);
    throw error;
  }
};

module.exports = { getInterventionDetails };
