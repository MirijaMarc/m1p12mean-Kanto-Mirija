const { generateToken } = require("../utils/jwt");
const bcrypt = require("bcrypt");

const Utilisateur = require("../models/Utilisateur");
const { interventionEnCoursByMecanicien } = require("../services/interventionService");

const inscription = async (req, res) => {
  try {
    const { nom, email, telephone, motDePasse } = req.body;

    const utilisateurExistant = await Utilisateur.findOne({ email });
    if (utilisateurExistant) {
      return res.status(400).json({
        statut: "error",
        message: "Cet email est déjà utilisé",
      });
    }

    const hashMotDePasse = await bcrypt.hash(motDePasse, 10);

    const nouvelUtilisateur = new Utilisateur({
      nom,
      email,
      motDePasse: hashMotDePasse,
      telephone,
      role: [{ id: 1, label: "client" }],
    });

    await nouvelUtilisateur.save();

    res.status(201).json({
      statut: "success",
      message: "Utilisateur inscrit avec succès",
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
    });
  }
};

const connexion = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) {
      return res.status(401).json({
        statut: "error",
        message: "Email ou mot de passe incorrect",
        data: null,
      });
    }

    const motDePasseValide = await bcrypt.compare(
      motDePasse,
      utilisateur.motDePasse
    );
    if (!motDePasseValide) {
      return res.status(401).json({
        statut: "error",
        message: "Mot de passe incorrect",
        data: null,
      });
    }

    const token = generateToken(utilisateur);

    res.status(200).json({
      statut: "success",
      message: "Connexion réussie",
      data: { token, utilisateur },
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const getUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find({ deletedAt: null }).select(
      "-motDePasse"
    );
    res.json({
      statut: "success",
      message: "Utilisateurs récupérés avec succès",
      data: utilisateurs,
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const getMecaniciens = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find({
      deletedAt: null,
      role: { $elemMatch: { id: 2 } },
    }).select("-motDePasse");
    const mecaniciens = await Promise.all(
      utilisateurs.map(async (mecanicien) => {
        const interventionEnCours = await interventionEnCoursByMecanicien(
          mecanicien._id
        );

        return {
          ...mecanicien.toObject(),
          interventionEnCours
        };
      })
    );
    res.json({
      statut: "success",
      message: "Mecaniciens récupérés avec succès",
      data: mecaniciens,
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const getClients = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find({
      deletedAt: null,
      role: { $elemMatch: { id: 1 } },
    }).select("-motDePasse");
    res.json({
      statut: "success",
      message: "Clients récupérés avec succès",
      data: utilisateurs,
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const getUtilisateurById = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.params.id).select(
      "-motDePasse"
    );
    if (!utilisateur) {
      return res.status(404).json({
        statut: "error",
        message: "Utilisateur non trouvé",
        data: null,
      });
    }
    res.json({
      statut: "success",
      message: "Utilisateur récupéré avec succès",
      data: utilisateur,
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const setRoleMecanicien = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.params.id);
    if (!utilisateur) {
      return res.status(404).json({
        statut: "error",
        message: "Utilisateur non trouvé",
        data: null,
      });
    }
    utilisateur.role = [{ id: 2, label: "mecanicien" }];
    await utilisateur.save();
    res.json({
      statut: "success",
      message: "Rôle mis à jour avec succès",
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

const updateUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!utilisateur) {
      return res.status(404).json({
        statut: "error",
        message: "Utilisateur non trouvé",
        data: null,
      });
    }
    res.json({
      statut: "success",
      message: "Utilisateur mis à jour avec succès",
      data: utilisateur,
    });
  } catch (error) {
    res.status(400).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const deleteUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.params.id);
    if (!utilisateur) {
      return res.status(404).json({
        statut: "error",
        message: "Utilisateur non trouvé",
        data: null,
      });
    }
    utilisateur.deletedAt = new Date();
    await utilisateur.save();
    res.json({
      statut: "success",
      message: "Utilisateur supprimé avec succès",
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
  connexion,
  inscription,
  getUtilisateurs,
  getUtilisateurById,
  updateUtilisateur,
  deleteUtilisateur,
  setRoleMecanicien,
  getMecaniciens,
  getClients
};
