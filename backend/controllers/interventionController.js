const Intervention = require("../models/Intervention");
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
    const interventions = await Intervention.find();
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
    const intervention = await Intervention.findById(req.params.id);
    if (!intervention) {
      return res.status(404).json({
        statut: "error",
        message: "Intervention non trouvée",
        data: null,
      });
    }
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
    const intervention = await Intervention.findByIdAndDelete(req.params.id);
    if (!intervention) {
      return res.status(404).json({
        statut: "error",
        message: "Intervention non trouvée",
        data: null,
      });
    }
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
};
