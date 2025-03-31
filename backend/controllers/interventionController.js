const Intervention = require("../models/Intervention");
const Prestation = require("../models/Prestation");
const Voiture = require("../models/Voiture");
const {
  getInterventionDetailsById,
  getProchaineInterventionDB,
  getInterventionsDetails,
  getInterventionsDetailsByClient,
  getInterventionsDetailsByMecanicien,
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
} = require("../services/interventionService");
const { newNotification } = require("../services/notificationService");
const { decodeToken } = require("../utils/jwt");

const newIntervention = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log('token ==>', token);
    var utilisateurId = decodeToken(token);
    console.log('utilisateurId ==>', utilisateurId);

    const { prestationsId, marque, dateIntervention, description, clientId = undefined } =
      req.body;
    let voiture = await Voiture.findOne({ marque });
    if (!voiture) {
      voiture = new Voiture({ marque });
      await voiture.save();
    }

    if (clientId) {
      utilisateurId = clientId;
    }

    const intervention = new Intervention({
      prestationsId,
      voiture,
      dateIntervention,
      description,
      clientId: utilisateurId,
      statut: 1,
      montant: await calculMontantIntervention(prestationsId),
    });
    await intervention.save();
    res.status(201).json({
      statut: "success",
      message: "Intervention créée avec succès",
      data: intervention,
    });
  } catch (error) {
    console.log(error);
    
    res.status(400).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};




const getAllInterventions = async (req, res) => {
  try {
    const interventions = await Intervention.find({ deletedAt: null })
    .populate({
      path: "clientId",
      select: "nom prenom email",
      as : "client"
    })
    .populate({
      path: "prestationsId",
      select: "label",
      as: "prestations",
    })
    .populate({
      path: "mecaniciensId",
      select: "nom prenom email",
      as: "mecaniciens",
    });
    res.json({
      statut: "success",
      message: "Interventions récupérées avec succès",
      data: interventions,
    });
  } catch (error) { 
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};


const getInterventions = async (req, res) => {
  try {
    const { recherche, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;


    const totalInterventions = await Intervention.countDocuments({ deletedAt: null });
    const interventions = await Intervention.find({ deletedAt: null })
      .populate({
        path: "clientId",
        select: "nom prenom email",
        as : "client"
      })
      .populate({
        path: "prestationsId",
        select: "label",
        as: "prestations",
      })
      .populate({
        path: "mecaniciensId",
        select: "nom prenom email",
        as: "mecaniciens",
      })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      statut: "success",
      message: "Interventions récupérées avec succès",
      data: interventions,
      pagination: {
        total: totalInterventions,
        page: Number(page),
        totalPages: Math.ceil(totalInterventions / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const getAllInterventionsByClient = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const clientId = decodeToken(token);
    const interventions = await getAllInterventionsDetailsByClient(clientId);
    res.json({
      statut: "success",
      message: "Interventions récupérées avec succès",
      data: interventions,
    });
  } catch (error) { 
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });   
  }
};

const getAllInterventionsByMecanicien = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const mecanicienId = decodeToken(token);
    const interventions = await getAllInterventionsDetailsByMecanicien(mecanicienId);
    res.json({  
      statut: "success",
      message: "Interventions récupérées avec succès",
      data: interventions,
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const getInterventionsByClient = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const clientId = decodeToken(token);

    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const totalInterventions = await Intervention.countDocuments({
      clientId: clientId,
      deletedAt: null,
    });

    const interventions = await getInterventionsDetailsByClient(clientId, skip, limit);

    res.json({
      statut: "success",
      message: "Interventions récupérées avec succès",
      data: interventions,
      pagination: {
        total: totalInterventions,
        page: Number(page),
        totalPages: Math.ceil(totalInterventions / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};


const getInterventionsByMecanicien = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const mecanicienId = decodeToken(token);
    const { page = 1, limit = 3 } = req.query;
    const skip = (page - 1) * limit;

    const totalInterventions = await Intervention.countDocuments({
      mecaniciensId: { $in: [mecanicienId] },
      deletedAt: null,
    });

    const interventions = await getInterventionsDetailsByMecanicien(mecanicienId, skip, limit);

    res.json({
      statut: "success",
      message: "Interventions récupérées avec succès",
      data: interventions,
      pagination: {
        total: totalInterventions,
        page: Number(page),
        totalPages: Math.ceil(totalInterventions / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};


const getInterventionById = async (req, res) => {
  try {
    const intervention = await getInterventionDetailsById(req.params.id);
    res.json({
      statut: "success",
      message: "Intervention récupérée avec succès",
      data: intervention,
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const getProchaineIntervention = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const clientId = decodeToken(token);

    const intervention = await getProchaineInterventionDB(clientId);
    res.json({
      statut: "success",
      message: "Intervention récupérée avec succès",
      data: intervention,
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const getNbInterventionByStatut = async (req, res) => {
  try {
    const nbInterventionByStatut = await getInterventionByStatut();
    res.json({
      statut: "success",
      message: "Nombre d'interventions par statut récupéré avec succès",
      data: {
        enattente: nbInterventionByStatut.statut_1,
        encours: nbInterventionByStatut.statut_2,
        annulee: nbInterventionByStatut.statut_3,
        terminee: nbInterventionByStatut.statut_4,
      },
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const getNbTotalPrestations = async (req, res) => {
  try {
    const { annee } = req.query;
    const nbTotalPrestations = await getTotalPrestations(annee);
    res.json({
      statut: "success",
      message: "Nombre total de prestations récupéré avec succès",
      data: { nbTotalPrestations },
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const getMontantTotalInterventions = async (req, res) => {
  try {
    const { annee } = req.query;
    const nbTotalPrestations = await getTotalMontantInterventions(annee);
    res.json({
      statut: "success",
      message: "Montant total des interventions récupéré avec succès",
      data: { nbTotalPrestations },
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const getMontantTotalInterventionsParMois = async (req, res) => {
  try {
    const { annee } = req.query;

    const totalMontant = await getTotalMontantInterventionsParMois(annee);

    return res.status(200).json({
      statut: "success",
      message: "Montant total des interventions par mois récupéré avec succès",
      data: totalMontant,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des montants des interventions",
      error
    );
    return res.status(500).json({
      statut: "error",
      message:
        "Erreur serveur lors de la récupération des montants des interventions",
      data: null,
    });
  }
};

const getNbTotalInterventionsParMois = async (req, res) => {
  try {
    const { annee } = req.query;

    const totalMontant = await getTotalInterventionsParMois(annee);

    return res.status(200).json({
      statut: "success",
      message: "Nombre total des interventions par mois récupéré avec succès",
      data: totalMontant,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du nombre des interventions",
      error
    );
    return res.status(500).json({
      statut: "error",
      message:
        "Erreur serveur lors de la récupération du nombre des interventions",
      data: null,
    });
  }
};

const getNbTotalInterventionsRealisees = async (req, res) => {
  try {
    const { annee } = req.query;
    const nbTotalPrestations = await getTotalInterventionsRealisees(annee);
    res.json({
      statut: "success",
      message: "Nombre total des interventions récupéré avec succès",
      data: { nbTotalPrestations },
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const getNbTotalPrestationsParJour = async (req, res) => {
  try {
    const nbTotalPrestationsParJour = await getTotalPrestationsParJour();
    res.json({
      statut: "success",
      message: "Nombre total de prestations récupéré avec succès",
      data: { nbTotalPrestationsParJour },
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const getNbTotalPrestationsParType = async (req, res) => {
  try {
    const { annee } = req.query;
    const nbTotalPrestationsParType = await getTotalPrestationsParType(annee);
    res.json({
      statut: "success",
      message: "Nombre total de prestations récupéré avec succès",
      data: { nbTotalPrestationsParType },
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const assignerMecaniciensIntervention = async (req, res) => {
  try {
    const { mecaniciensId } = req.body;
    const intervention = await Intervention.findById(req.params.id);
    if (!intervention) {
      return res.status(404).json({
        statut: "error",
        message: "Intervention non trouvée",
        data: null,
      });
    }
    console.log(mecaniciensId, 'mecaniciensId');
    
    intervention.mecaniciensId = mecaniciensId;
    console.log(intervention, 'intervention');
    
    await intervention.save();
    res.json({
      statut: "success",
      message: "Mécaniciens assignés avec succès",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const annulerIntervention = async (req, res) => {
  try {
    const intervention = await Intervention.findById(req.params.id);
    if (!intervention) {
      return res.status(404).json({
        statut: "error",
        message: "Intervention non trouvée",
        data: null,
      });
    }
    intervention.statut = 3;
    await intervention.save();
    res.json({
      statut: "success",
      message: "Intervention annulée avec succès",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const commencerIntervention = async (req, res) => {
  try {
    const intervention = await Intervention.findById(req.params.id);
    if (!intervention) {
      return res.status(404).json({
        statut: "error",
        message: "Intervention non trouvée",
        data: null,
      });
    }
    intervention.statut = 2;
    await intervention.save();
    await newNotification(
      intervention.clientId,
      "Début de l'intervention sur votre voiture"
    );
    res.json({
      statut: "success",
      message: "Intervention commencée avec succès",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const terminerIntervention = async (req, res) => {
  try {
    const intervention = await Intervention.findById(req.params.id);
    if (!intervention) {
      return res.status(404).json({
        statut: "error",
        message: "Intervention non trouvée",
        data: null,
      });
    }
    intervention.statut = 4;
    await intervention.save();
    await newNotification(
      intervention.clientId,
      "Intervention terminée - Votre voiture est prete"
    );
    res.json({
      statut: "success",
      message: "Intervention terminée avec succès",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const updateIntervention = async (req, res) => {
  try {
    const intervention = await Intervention.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!intervention) {
      return res.status(404).json({
        statut: "error",
        message: "Intervention non trouvée",
        data: null,
      });
    }
    res.json({
      statut: "success",
      message: "Intervention mis à jour avec succès",
      data: intervention,
    });
  } catch (error) {
    res.status(400).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const deleteIntervention = async (req, res) => {
  try {
    const intervention = await Intervention.findById(req.params.id);
    if (!intervention) {
      return res.status(404).json({
        statut: "error",
        message: "Intervention non trouvée",
        data: null,
      });
    }
    intervention.deletedAt = new Date();
    await intervention.save();
    res.json({
      statut: "success",
      message: "Intervention supprimée avec succès",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  newIntervention,
  getInterventions,
  getInterventionById,
  updateIntervention,
  deleteIntervention,
  annulerIntervention,
  getProchaineIntervention,
  commencerIntervention,
  terminerIntervention,
  getInterventionsByClient,
  getInterventionsByMecanicien,
  assignerMecaniciensIntervention,
  getNbInterventionByStatut,
  getNbTotalPrestations,
  getNbTotalPrestationsParJour,
  getNbTotalPrestationsParType,
  getMontantTotalInterventions,
  getNbTotalInterventionsRealisees,
  getMontantTotalInterventionsParMois,
  getNbTotalInterventionsParMois,
  getAllInterventionsByClient,
  getAllInterventionsByMecanicien,
  getAllInterventions
};
