const Intervention = require("../models/Intervention");
const Prestation = require("../models/Prestation");
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
} = require("../services/interventionService");
const { decodeToken } = require("../utils/jwt");

const newIntervention = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const clientId = decodeToken(token);
    const { prestationsId, voiture, dateIntervention, description } = req.body;
    if (voiture._id) {
      voitureInfo = { _id: voiture._id, marque: voiture.marque };
    } else {
      voitureInfo = { marque: voiture.marque };
    }
    const intervention = new Intervention({
      prestationsId,
      voiture: voitureInfo,
      dateIntervention,
      description,
      clientId,
      statut: 1,
      montant: await calculMontantIntervention(prestationsId)
    });
    await intervention.save();
    res.status(201).json({
      statut: "success",
      message: "Intervention créée avec succès",
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

const getInterventions = async (req, res) => {
  try {
    const interventions = await getInterventionsDetails();
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
    const interventions = await getInterventionsDetailsByClient(clientId);
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

const getInterventionsByMecanicien = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const mecanicienId = decodeToken(token);
    const interventions = await getInterventionsDetailsByMecanicien(
      mecanicienId
    );
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
    const nbTotalPrestations = await getTotalPrestations();
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

const getMontantTotalPrestations = async (req, res) => {
  try {
    const nbTotalPrestations = await getTotalMontantInterventions();
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
    const nbTotalPrestationsParType = await getTotalPrestationsParType();
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
    intervention.mecaniciensId = mecaniciensId;
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
  getTotalMontantInterventions
};
