const Prestation = require("../models/Prestation");

const createPrestation = async (req, res) => {
  try {
    const prestation = new Prestation(req.body);
    await prestation.save();
    res.status(201).json({
      statut: "success",
      message: "Prestation créée avec succès",
      data: prestation
    });
  } catch (error) {
    res.status(400).json({
      statut: "error",
      message: error.message,
      data: null
    });
  }
};

const getPrestations = async (req, res) => {
  try {
    const prestations = await Prestation.find();
    res.json({
      statut: "success",
      message: "Prestations récupérées avec succès",
      data: prestations
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null
    });
  }
};

const getPrestationById = async (req, res) => {
  try {
    const prestation = await Prestation.findById(req.params.id);
    if (!prestation) {
      return res.status(404).json({
        statut: "error",
        message: "Prestation non trouvée",
        data: null
      });
    }
    res.json({
      statut: "success",
      message: "Prestation récupérée avec succès",
      data: prestation
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null
    });
  }
};

const updatePrestation = async (req, res) => {
  try {
    const prestation = await Prestation.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!prestation) {
      return res.status(404).json({
        statut: "error",
        message: "Prestation non trouvée",
        data: null
      });
    }
    res.json({
      statut: "success",
      message: "Prestation mis à jour avec succès",
      data: prestation
    });
  } catch (error) {
    res.status(400).json({
      statut: "error",
      message: error.message,
      data: null
    });
  }
};

const deletePrestation = async (req, res) => {
  try {
    const prestation = await Prestation.findByIdAndDelete(req.params.id);
    if (!prestation) {
      return res.status(404).json({
        statut: "error",
        message: "Prestation non trouvée",
        data: null
      });
    }
    res.json({
      statut: "success",
      message: "Prestation supprimée avec succès",
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
  createPrestation,
  getPrestations,
  getPrestationById,
  updatePrestation,
  deletePrestation,
};
