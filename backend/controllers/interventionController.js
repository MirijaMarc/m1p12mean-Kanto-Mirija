const Intervention = require("../models/Intervention");
const Prestation = require("../models/Prestation");
const { getInterventionDetails } = require("../services/interventionService");
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
    const interventions = await Intervention.find({ deletedAt: null });
    const interventionsWithLabels = interventions.map((intervention) => {
      return {
        ...intervention.toObject(),
        labelStatut: Intervention.getLabelStatut(intervention.statut)
      };
    });
    res.json({
      statut: "success",
      message: "Interventions récupérées avec succès",
      data: interventionsWithLabels,
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
    const interventions = await Intervention.find({ clientId: clientId, deletedAt: null });
    const interventionsWithLabels = interventions.map((intervention) => {
      return {
        ...intervention.toObject(),
        labelStatut: Intervention.getLabelStatut(intervention.statut)
      };
    });
    res.json({
      statut: "success",
      message: "Interventions récupérées avec succès",
      data: interventionsWithLabels
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
    const intervention = await getInterventionDetails(req.params.id);
    res.json({
      statut: "success",
      message: "Intervention récupérée avec succès",
      data: intervention
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
  getInterventionsByClient,
  annulerIntervention
};
