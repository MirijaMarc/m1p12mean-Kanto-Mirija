const { generateToken } = require("../utils/jwt");
const bcrypt = require("bcrypt");

const Utilisateur = require("../models/Utilisateur");
const {
  interventionEnCoursByMecanicien,
} = require("../services/interventionService");

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

const newUtilisateur = async (req, res) => {
  try {
    const { nom, email, roleId, roleLabel, telephone, motDePasse } = req.body;

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
      role: [{ id: roleId, label: roleLabel }],
    });

    await nouvelUtilisateur.save();

    res.status(201).json({
      statut: "success",
      message: "Utilisateur enregistré avec succès",
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

    const token = generateToken(utilisateur._id, utilisateur.role.id);

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
    const { recherche, page = 1, limit = 10 } = req.query;
    let condition = { deletedAt: null, role: { $elemMatch: { id: 2 } } };

    if (recherche) {
      condition = {
        ...condition,
        $or: [
          { nom: { $regex: recherche, $options: "i" } },
          { email: { $regex: recherche, $options: "i" } },
        ],
      };
    }

    const skip = (page - 1) * limit;
    const utilisateurs = await Utilisateur.find(condition)
      .skip(skip)
      .limit(Number(limit))
      .select("-motDePasse");

    const totalMecaniciens = await Utilisateur.countDocuments(condition);

    const mecaniciens = await Promise.all(
      utilisateurs.map(async (mecanicien) => {
        const interventionEnCours = await interventionEnCoursByMecanicien(
          mecanicien._id
        );

        return {
          ...mecanicien.toObject(),
          interventionEnCours,
        };
      })
    );

    res.json({
      statut: "success",
      message: "Mecaniciens récupérés avec succès",
      data: mecaniciens,
      pagination: {
        total: totalMecaniciens,
        page: Number(page),
        totalPages: Math.ceil(totalMecaniciens / limit),
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


const getClients = async (req, res) => {
  try {
    const { recherche, page = 1, limit = 10 } = req.query;
    let condition = { deletedAt: null, role: { $elemMatch: { id: 1 } } };

    if (recherche) {
      condition = {
        ...condition,
        $or: [
          { nom: { $regex: recherche, $options: "i" } },
          { email: { $regex: recherche, $options: "i" } },
        ],
      };
    }

    const skip = (page - 1) * limit;
    const clients = await Utilisateur.find(condition)
      .skip(skip)
      .limit(Number(limit))
      .select("-motDePasse");

    const totalClients = await Utilisateur.countDocuments(condition);

    res.json({
      statut: "success",
      message: "Clients récupérés avec succès",
      data: clients,
      pagination: {
        total: totalClients,
        page: Number(page),
        totalPages: Math.ceil(totalClients / limit),
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


const getNbClients = async (req, res) => {
  try {
    const { annee } = req.query;

    let matchCondition = {
      role: { $elemMatch: { id: 1 } },
    };

    if (annee) {
      const startOfYear = new Date(`${annee}-01-01T00:00:00.000Z`);
      const endOfYear = new Date(`${parseInt(annee) + 1}-01-01T00:00:00.000Z`);

      matchCondition.createdAt = {
        $gte: startOfYear,
        $lt: endOfYear,
      };
    }

    const nbClients = await Utilisateur.countDocuments(matchCondition);

    res.json({
      statut: "success",
      message: "Nombre de clients récupérés avec succès",
      data: { nbClients },
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

const setRoleManager = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.params.id);
    if (!utilisateur) {
      return res.status(404).json({
        statut: "error",
        message: "Utilisateur non trouvé",
        data: null,
      });
    }
    utilisateur.role = [{ id: 3, label: "manager" }];
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
  newUtilisateur,
  getUtilisateurs,
  getUtilisateurById,
  updateUtilisateur,
  deleteUtilisateur,
  setRoleMecanicien,
  setRoleManager,
  getMecaniciens,
  getClients,
  getNbClients,
};
