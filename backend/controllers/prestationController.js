const Prestation = require("../models/Prestation");
const mongoose = require("mongoose");

const createPrestation = async (req, res) => {
  try {
    const { label, tarif, description, duree } = req.body;
    const prestation = new Prestation({ label, tarifs: [{ montant: tarif }], description, duree });
    await prestation.save();
    res.status(201).json({
      statut: "success",
      message: "Prestation créée avec succès",
      data: prestation,
    });
  } catch (error) {
    res.status(400).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const getPrestations = async (req, res) => {
  try {
    const { recherche, page = 1, limit = 10 } = req.query;
    let condition = { deletedAt: null };

    if (recherche) {
      condition = {
        ...condition,
        label: { $regex: recherche, $options: "i" },
      };
    }

    const skip = (page - 1) * limit;
    const prestations = await Prestation.aggregate([
      { $match: condition },
      {
        $addFields: {
          tarifRecent: { $arrayElemAt: ["$tarifs.montant", -1] },
        },
      },
      { $skip: skip },
      { $limit: Number(limit) },
    ]);

    const totalPrestations = await Prestation.countDocuments(condition);

    res.json({
      statut: "success",
      message: "Prestations récupérées avec succès",
      data: prestations,
      pagination: {
        total: totalPrestations,
        page: Number(page),
        totalPages: Math.ceil(totalPrestations / limit),
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

const getAllPrestations = async (req, res) => {
  try {

    let condition = { deletedAt: null };

    const prestations = await Prestation.aggregate([
      { $match: condition },
      {
        $addFields: {
          tarifRecent: { $arrayElemAt: ["$tarifs.montant", -1] },
        },
      }
    ]);

    const totalPrestations = await Prestation.countDocuments(condition);

    res.json({
      statut: "success",
      message: "Prestations récupérées avec succès",
      data: prestations
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};



const getPrestationById = async (req, res) => {
  try {
    const prestation = await Prestation.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id),
          deletedAt: null,
        },
      },
      {
        $addFields: {
          tarifRecent: { $arrayElemAt: ["$tarifs.montant", -1] },
        },
      },
    ]);

    res.json({
      statut: "success",
      message: "Prestation récupérée avec succès",
      data: prestation.length > 0 ? prestation[0] : null,
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const updatePrestation = async (req, res) => {
  try {
    const { label, tarif, description, duree } = req.body;
    const prestation = await Prestation.findById(req.params.id);
    if (!prestation) {
      return res.status(404).json({ message: "Prestation non trouvée" });
    }
    if (label) prestation.label = label;
    if (description) prestation.description = description;
    if (duree) prestation.duree = duree;

    const dernierTarif =
      prestation.tarifs.length > 0
        ? prestation.tarifs[prestation.tarifs.length - 1]
        : null;

    if (!dernierTarif || dernierTarif.montant !== tarif) {
      prestation.tarifs.push({ montant: tarif });
    }

    await prestation.save();
    return res
      .status(200)
      .json({ message: "Prestation mise à jour avec succès", prestation });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};

module.exports = { updatePrestation };

const deletePrestation = async (req, res) => {
  try {
    const prestation = await Prestation.findById(req.params.id);
    if (!prestation) {
      return res.status(404).json({
        statut: "error",
        message: "Prestation non trouvée",
        data: null,
      });
    }
    prestation.deletedAt = new Date();
    await prestation.save();
    res.json({
      statut: "success",
      message: "Prestation supprimée avec succès",
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
  createPrestation,
  getPrestations,
  getPrestationById,
  updatePrestation,
  deletePrestation,
  getAllPrestations
};
