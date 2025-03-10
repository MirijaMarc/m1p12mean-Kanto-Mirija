const Voiture = require("../models/Voiture");

const createVoiture = async (req, res) => {
  try {
    const voiture = new Voiture(req.body);
    await voiture.save();
    res.status(201).json({
      statut: "success",
      message: "Voiture créée avec succès",
      data: voiture
    });
  } catch (error) {
    res.status(400).json({
      statut: "error",
      message: error.message,
      data: null
    });
  }
};

const getVoitures = async (req, res) => {
  try {
    const voitures = await Voiture.find({ deletedAt: null });
    res.json({
      statut: "success",
      message: "Voitures récupérées avec succès",
      data: voitures
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null
    });
  }
};

const getVoitureById = async (req, res) => {
  try {
    const voiture = await Voiture.findById(req.params.id);
    if (!voiture) {
      return res.status(404).json({
        statut: "error",
        message: "Voiture non trouvée",
        data: null
      });
    }
    res.json({
      statut: "success",
      message: "Voiture récupérée avec succès",
      data: voiture
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null
    });
  }
};

const updateVoiture = async (req, res) => {
  try {
    const voiture = await Voiture.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!voiture) {
      return res.status(404).json({
        statut: "error",
        message: "Voiture non trouvée",
        data: null
      });
    }
    res.json({
      statut: "success",
      message: "Voiture mis à jour avec succès",
      data: voiture
    });
  } catch (error) {
    res.status(400).json({
      statut: "error",
      message: error.message,
      data: null
    });
  }
};

const deleteVoiture = async (req, res) => {
  try {
    const voiture = await Voiture.findById(req.params.id);
    if (!voiture) {
      return res.status(404).json({
        statut: "error",
        message: "Voiture non trouvé",
        data: null
      });
    }
    voiture.deletedAt = new Date();
    await voiture.save();
    res.json({
      statut: "success",
      message: "Voiture supprimée avec succès",
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
  createVoiture,
  getVoitures,
  getVoitureById,
  updateVoiture,
  deleteVoiture,
};
