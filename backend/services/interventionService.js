const Intervention = require("../models/Intervention");
const Utilisateur = require("../models/Utilisateur");
const { getPrestationsByIds } = require("./prestationService");
const { getUtilisateursByIds } = require("./utilisateurService");

const getInterventionsDetails = async () => {
  try {
    const interventions = await Intervention.find({ deletedAt: null });

    const interventionsDetails = await Promise.all(
      interventions.map(async (intervention) => {
        const labelStatut = Intervention.getLabelStatut(intervention.statut);
        const mecaniciens = await getUtilisateursByIds(
          intervention.mecaniciensId
        );
        const prestations = await getPrestationsByIds(
          intervention.prestationsId
        );
        const client = await Utilisateur.findById(intervention.clientId).select(
          "-motDePasse"
        );

        return {
          ...intervention.toObject(),
          labelStatut,
          prestations,
          mecaniciens,
          client,
        };
      })
    );

    return interventionsDetails;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails des interventions:",
      error
    );
    throw error;
  }
};

const getInterventionsDetailsByClient = async (clientId) => {
  try {
    const interventions = await Intervention.find({
      clientId: clientId,
      deletedAt: null,
    });

    const interventionsDetails = await Promise.all(
      interventions.map(async (intervention) => {
        const labelStatut = Intervention.getLabelStatut(intervention.statut);
        const mecaniciens = await getUtilisateursByIds(
          intervention.mecaniciensId
        );
        const prestations = await getPrestationsByIds(
          intervention.prestationsId
        );
        return {
          ...intervention.toObject(),
          labelStatut,
          prestations,
          mecaniciens,
        };
      })
    );

    return interventionsDetails;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails des interventions:",
      error
    );
    throw error;
  }
};

const getInterventionsDetailsByMecanicien = async (mecanicienId) => {
  try {
    const interventions = await Intervention.find({
      mecaniciensId: { $in: [mecanicienId] },
      deletedAt: null,
    });

    const interventionsDetails = await Promise.all(
      interventions.map(async (intervention) => {
        const labelStatut = Intervention.getLabelStatut(intervention.statut);
        const prestations = await getPrestationsByIds(
          intervention.prestationsId
        );
        const client = await Utilisateur.findById(intervention.clientId).select(
          "-motDePasse"
        );

        return {
          ...intervention.toObject(),
          labelStatut,
          prestations,
          client,
        };
      })
    );

    return interventionsDetails;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails des interventions:",
      error
    );
    throw error;
  }
};

const getInterventionDetailsById = async (id) => {
  try {
    const intervention = await Intervention.findById(id);
    if (!intervention) {
      throw new Error("Intervention non trouvée");
    }

    const labelStatut = Intervention.getLabelStatut(intervention.statut);
    const mecaniciens = await getUtilisateursByIds(intervention.mecaniciensId);
    const prestations = await getPrestationsByIds(intervention.prestationsId);
    const client = await Utilisateur.findById(intervention.clientId).select(
      "-motDePasse"
    );
    return {
      ...intervention.toObject(),
      labelStatut,
      prestations,
      mecaniciens,
      client,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des details de l'intervention:",
      error
    );
    throw error;
  }
};

const getProchaineInterventionDB = async (clientId) => {
  try {
    const intervention = await Intervention.findOne({
      clientId: clientId,
      statut: { $ne: 3 },
      deletedAt: null,
      dateIntervention: { $gt: new Date() },
    }).sort({ dateIntervention: 1 });
    const interventionDetails = getInterventionDetailsById(intervention._id);
    return interventionDetails || null;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des details de l'intervention:",
      error
    );
    throw error;
  }
};

const interventionEnCoursByMecanicien = async (mecanicienId) => {
  try {
    const nbInterventionEnCours = await Intervention.countDocuments({
      statut: 2,
      mecaniciensId: { $in: [mecanicienId] },
    });
    return nbInterventionEnCours || 0;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du nombre d'intervention en cours:",
      error
    );
    throw error;
  }
};

module.exports = {
  getInterventionDetailsById,
  getProchaineInterventionDB,
  getInterventionsDetails,
  getInterventionsDetailsByClient,
  getInterventionsDetailsByMecanicien,
  interventionEnCoursByMecanicien
};
