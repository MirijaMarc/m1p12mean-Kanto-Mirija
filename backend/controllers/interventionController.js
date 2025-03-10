const Intervention = require("../models/Intervention");

const createIntervention = async (req, res) => {
  try {
    const intervention = new Intervention(req.body);
    await intervention.save();
    res.status(201).json({
      statut: "success",
      message: "Intervention créée avec succès",
      data: intervention
    });
  } catch (error) {
    res.status(400).json({
      statut: "error",
      message: error.message,
      data: null
    });
  }
};

const getInterventions = async (req, res) => {
  try {
    const interventions = await Intervention.find();
    res.json({
      statut: "success",
      message: "Interventions récupérées avec succès",
      data: interventions
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null
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
        data: null
      });
    }
    res.json({
      statut: "success",
      message: "Intervention récupérée avec succès",
      data: intervention
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null
    });
  }
};

const updateIntervention = async (req, res) => {
  try {
    const intervention = await Intervention.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!intervention) {
      return res.status(404).json({
        statut: "error",
        message: "Intervention non trouvée",
        data: null
      });
    }
    res.json({
      statut: "success",
      message: "Intervention mis à jour avec succès",
      data: intervention
    });
  } catch (error) {
    res.status(400).json({
      statut: "error",
      message: error.message,
      data: null
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
        data: null
      });
    }
    res.json({
      statut: "success",
      message: "Intervention supprimée avec succès",
      data: null
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null
    });
  }
};

module.exports = {
  createIntervention,
  getInterventions,
  getInterventionById,
  updateIntervention,
  deleteIntervention,
};
