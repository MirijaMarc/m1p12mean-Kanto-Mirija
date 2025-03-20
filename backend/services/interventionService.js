const Intervention = require("../models/Intervention");
const Utilisateur = require("../models/Utilisateur");
const Prestation = require("../models/Prestation");
const {
  getPrestationsByIds,
  getPrixRecentPrestation,
} = require("./prestationService");
const { getUtilisateursByIds } = require("./utilisateurService");

const calculMontantIntervention = async (prestationsId) => {
  try {
    let montant = 0;
    for (const prestationId of prestationsId) {
      console.log(await getPrixRecentPrestation(prestationId)+" monnnnnn");

      montant += await getPrixRecentPrestation(prestationId);
    }
    return montant;
  } catch (error) {
    console.error("Erreur lors du calcul du montant de l'intervention:", error);
    throw error;
  }
};

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

const getInterventionByStatut = async () => {
  try {
    const counts = await Intervention.aggregate([
      { $match: { deletedAt: null } },
      {
        $group: {
          _id: "$statut",
          count: { $sum: 1 },
        },
      },
    ]);

    const result = {
      statut_1: 0, // en attente
      statut_2: 0, // en cours
      statut_3: 0, // annulee
      statut_4: 0, // terminee
    };

    counts.forEach(({ _id, count }) => {
      result[`statut_${_id}`] = count;
    });

    return result;
  } catch (error) {
    console.error("Erreur", error);
    throw error;
  }
};

const getTotalPrestations = async (mecanicienId) => {
  try {
    const totalPrestations = await Intervention.aggregate([
      {
        $match: {
          statut: { $ne: 3 },
          deletedAt: null,
        },
      },
      { $unwind: "$prestationsId" },
      {
        $group: {
          _id: null,
          totalPrestations: { $sum: 1 },
        },
      },
    ]);

    return totalPrestations.length > 0
      ? totalPrestations[0].totalPrestations
      : 0;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du nombre de prestations",
      error
    );
    throw error;
  }
};

const getTotalPrestationsParJour = async (mecanicienId) => {
  try {
    const totalPrestationsParJour = await Intervention.aggregate([
      {
        $match: {
          statut: { $ne: 3 },
          deletedAt: null,
        },
      },
      { $unwind: "$prestationsId" },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$dateIntervention" },
          },
          totalPrestations: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          jour: "$_id",
          totalPrestations: 1,
        },
      },
    ]);

    return totalPrestationsParJour;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du nombre de prestations par jour",
      error
    );
    throw error;
  }
};

const getTotalPrestationsParType = async () => {
  try {
    const nbTotalPrestationsParType = await Prestation.aggregate([
      {
        $match: { deletedAt: null },
      },
      {
        $lookup: {
          from: "interventions",
          localField: "_id",
          foreignField: "prestationsId",
          as: "interventions",
        },
      },
      {
        $unwind: {
          path: "$interventions",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          $or: [
            { "interventions.statut": { $ne: 3 } },
            { interventions: { $exists: false } },
          ],
        },
      },
      {
        $group: {
          _id: "$_id",
          label: { $first: "$label" },
          totalPrestations: {
            $sum: { $cond: [{ $ifNull: ["$interventions", false] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          prestationId: "$_id",
          label: 1,
          totalPrestations: 1,
        },
      },
    ]);

    return nbTotalPrestationsParType;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du nombre de prestations",
      error
    );
    throw error;
  }
};

const getTotalMontantInterventions = async () => {
  try {
    const totalMontant = await Intervention.aggregate([
      {
        $match: { deletedAt: null, statut: { $ne: 3 } },
      },
      {
        $group: {
          _id: null,
          totalMontant: { $sum: "$montant" },
        },
      },
    ]);

    return totalMontant.length > 0 ? totalMontant[0].totalMontant : 0;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du montant total des interventions",
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
  interventionEnCoursByMecanicien,
  getInterventionByStatut,
  getTotalPrestations,
  getTotalPrestationsParJour,
  getTotalPrestationsParType,
  calculMontantIntervention,
  getTotalMontantInterventions
};
