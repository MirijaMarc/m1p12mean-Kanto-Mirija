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
      montant += await getPrixRecentPrestation(prestationId);
    }
    return montant;
  } catch (error) {
    console.error("Erreur lors du calcul du montant de l'intervention:", error);
    throw error;
  }
};

const getInterventionsDetails = async (skip, limit) => {
  try {
    const interventions = await Intervention.find({ deletedAt: null })
      .skip(skip)
      .limit(limit);

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
          prestationsId : prestations,
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

const getInterventionsDetailsByClient = async (clientId, skip, limit) => {
  try {
    const interventions = await Intervention.find({
      clientId: clientId,
      deletedAt: null,
    })
      .skip(skip)
      .limit(limit);

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
          prestationsId : prestations,
          mecaniciensId : mecaniciens,
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


const getAllInterventionsDetailsByClient = async (clientId) => {
  try {
    const interventions = await Intervention.find({
      clientId: clientId,
      deletedAt: null,
    });
    const interventionsDetails = await Promise.all(
      interventions.map(async (intervention) => {
        const labelStatut = Intervention.getLabelStatut(intervention.statut);
        const prestations = await getPrestationsByIds(intervention.prestationsId);
        const client = await Utilisateur.findById(intervention.clientId).select("-motDePasse");
        return {
          ...intervention.toObject(),
          labelStatut,
          prestationsId : prestations,
          client,
        };
      })    
    );
    return interventionsDetails;
  } catch (error) {
    throw error;
  }
};  

const getAllInterventionsDetailsByMecanicien = async (mecanicienId) => {
  try {
      const interventions = await Intervention.find({
      mecaniciensId: { $in: [mecanicienId] },
      deletedAt: null,
    });
    const interventionsDetails = await Promise.all(
      interventions.map(async (intervention) => {
        const labelStatut = Intervention.getLabelStatut(intervention.statut);
        const prestations = await getPrestationsByIds(intervention.prestationsId);
        const client = await Utilisateur.findById(intervention.clientId).select("-motDePasse"); 
        return {
          ...intervention.toObject(),
          labelStatut,
          prestationsId : prestations,
          client,
        };
      })
    );
    return interventionsDetails;
  } catch (error) {
    throw error;
  }
};

const getInterventionsDetailsByMecanicien = async (mecanicienId, skip, limit) => {
  try {
    const interventions = await Intervention.find({
      mecaniciensId: { $in: [mecanicienId] },
      deletedAt: null,
    })
      .skip(skip)
      .limit(limit);

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
          prestationsId : prestations,
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

const getTotalPrestations = async (annee = null) => {
  try {
    let matchCondition = {
      statut: { $ne: 3 },
      deletedAt: null,
    };

    if (annee) {
      const startOfYear = new Date(`${annee}-01-01T00:00:00.000Z`);
      const endOfYear = new Date(`${parseInt(annee) + 1}-01-01T00:00:00.000Z`);

      matchCondition.dateIntervention = {
        $gte: startOfYear,
        $lt: endOfYear,
      };
    }

    const totalPrestations = await Intervention.aggregate([
      { $match: matchCondition },
      { $unwind: "$prestationsId" },
      {
        $group: {
          _id: annee ? { annee: { $year: "$dateIntervention" } } : null,
          totalPrestations: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          annee: "$_id.annee",
          totalPrestations: 1,
        },
      },
      { $sort: { annee: 1 } },
    ]);

    if (annee) {
      return totalPrestations.length > 0
        ? totalPrestations[0].totalPrestations
        : 0;
    }

    return totalPrestations;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du nombre de prestations",
      error
    );
    throw error;
  }
};


const getTotalPrestationsParJour = async () => {
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

const getTotalPrestationsParType = async (annee) => {
  try {
    const year = (annee ?? new Date().getFullYear()).toString();

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
        $addFields: {
          interventionYear: {
            $cond: [
              { $ifNull: ["$interventions.dateIntervention", false] },
              { $year: "$interventions.dateIntervention" },
              null
            ]
          }
        }
      },
      {
        $match: {
          $and: [
            {
              $or: [
                { "interventions.statut": { $ne: 3 } },
                { interventions: { $exists: false } },
              ]
            },
            {
              $or: [
                { interventionYear: parseInt(year) },
                { interventionYear: null }
              ]
            }
          ]
        }
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
    console.error("Erreur lors de la récupération du nombre de prestations", error);
    throw error;
  }
};

const getTotalMontantInterventions = async (annee = null) => {
  try {
    let matchCondition = { deletedAt: null, statut: { $ne: 3 } };

    if (annee) {
      matchCondition.dateIntervention = {
        $gte: new Date(`${annee}-01-01T00:00:00.000Z`),
        $lte: new Date(`${annee}-12-31T23:59:59.999Z`),
      };
    }

    const totalMontant = await Intervention.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: annee ? null : { annee: { $year: "$dateIntervention" } },
          totalMontant: { $sum: "$montant" },
        },
      },
      {
        $project: {
          _id: 0,
          annee: annee ? annee : "$_id.annee",
          totalMontant: 1,
        },
      },
      { $sort: { annee: 1 } },
    ]);

    return totalMontant.length > 0
      ? totalMontant
      : [{ annee: annee, totalMontant: 0 }];
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du montant total des interventions",
      error
    );
    throw error;
  }
};

const getTotalMontantInterventionsParMois = async (annee = null) => {
  try {
    let matchCondition = { deletedAt: null, statut: { $ne: 3 } };

    if (annee) {
      matchCondition.dateIntervention = {
        $gte: new Date(`${annee}-01-01T00:00:00.000Z`),
        $lte: new Date(`${annee}-12-31T23:59:59.999Z`),
      };
    }

    const totalMontant = await Intervention.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: {
            annee: { $year: "$dateIntervention" },
            mois: { $month: "$dateIntervention" },
          },
          totalMontant: { $sum: "$montant" },
        },
      },
      {
        $project: {
          _id: 0,
          annee: "$_id.annee",
          mois: "$_id.mois",
          totalMontant: 1,
        },
      },
      { $sort: { annee: 1, mois: 1 } },
    ]);

    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const result = months.map((mois) => {
      const moisData = totalMontant.find((item) => item.mois === mois);
      return {
        annee: annee,
        mois,
        totalMontant: moisData ? moisData.totalMontant : 0,
      };
    });

    return result;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du montant total des interventions par mois",
      error
    );
    throw error;
  }
};

const getTotalInterventionsRealisees = async (annee = null) => {
  try {
    let matchCondition = { deletedAt: null,  statut: { $ne: 3 }, };

    if (annee) {
      matchCondition.dateIntervention = {
        $gte: new Date(`${annee}-01-01T00:00:00.000Z`),
        $lte: new Date(`${annee}-12-31T23:59:59.999Z`),
      };
    }

    const totalInterventions = await Intervention.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: annee ? null : { annee: { $year: "$dateIntervention" } },
          totalInterventions: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          annee: annee ? annee : "$_id.annee",
          totalInterventions: 1,
        },
      },
      { $sort: { annee: 1 } },
    ]);

    return totalInterventions;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du nombre d'interventions par an",
      error
    );
    throw error;
  }
};

const getTotalInterventionsParMois = async (annee = null) => {
  try {
    let matchCondition = { deletedAt: null,  statut: { $ne: 3 }, };
    if (annee) {
      matchCondition.dateIntervention = {
        $gte: new Date(`${annee}-01-01T00:00:00.000Z`),
        $lte: new Date(`${annee}-12-31T23:59:59.999Z`),
      };
    }

    const totalInterventionsParMois = await Intervention.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: {
            annee: { $year: "$dateIntervention" },
            mois: { $month: "$dateIntervention" },
          },
          totalInterventions: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          annee: "$_id.annee",
          mois: "$_id.mois",
          totalInterventions: 1,
        },
      },
      { $sort: { annee: 1, mois: 1 } },
    ]);

    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const result = months.map((mois) => {
      const moisData = totalInterventionsParMois.find(
        (item) => item.mois === mois
      );
      return {
        annee: annee,
        mois,
        totalInterventions: moisData ? moisData.totalInterventions : 0,
      };
    });

    return result;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du nombre d'interventions par mois",
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
  getTotalMontantInterventions,
  getTotalMontantInterventionsParMois,
  getTotalInterventionsRealisees,
  getTotalInterventionsParMois,
  getAllInterventionsDetailsByClient,
  getAllInterventionsDetailsByMecanicien
};
