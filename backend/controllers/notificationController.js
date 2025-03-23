const Notification = require("../models/Notification");

const marquerLuNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({
        statut: "error",
        message: "Notification non trouvée",
        data: null,
      });
    }
    notification.lu = true;
    await notification.save();
    res.json({
      statut: "success",
      message: "Notification marquée comme lue",
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

const toutMarquerLuNotification = async (req, res) => {
  try {
    const utilisateurId = req.params.utilisateurId;
    await Notification.updateMany(
      { lu: false, utilisateurId },
      { $set: { lu: true } }
    );
    res.json({
      statut: "success",
      message: "Toutes les notifications ont été marquées comme lues",
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

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ deletedAt: null });
    res.json({
      statut: "success",
      message: "Notifications récupérées avec succès",
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const getNotificationsByUtilisateur = async (req, res) => {
  try {
    const utilisateurId = req.params.utilisateurId;
    const notifications = await Notification.find({ deletedAt: null, utilisateurId });
    res.json({
      statut: "success",
      message: "Notifications récupérées avec succès",
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({
        statut: "error",
        message: "Notification non trouvée",
        data: null,
      });
    }
    res.json({
      statut: "success",
      message: "Notification récupérée avec succès",
      data: notification,
    });
  } catch (error) {
    res.status(500).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!notification) {
      return res.status(404).json({
        statut: "error",
        message: "Notification non trouvée",
        data: null,
      });
    }
    res.json({
      statut: "success",
      message: "Notification mis à jour avec succès",
      data: notification,
    });
  } catch (error) {
    res.status(400).json({
      statut: "error",
      message: error.message,
      data: null,
    });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({
        statut: "error",
        message: "Notification non trouvé",
        data: null,
      });
    }
    notification.deletedAt = new Date();
    await notification.save();
    res.json({
      statut: "success",
      message: "Notification supprimée avec succès",
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
  getNotifications,
  marquerLuNotification,
  toutMarquerLuNotification,
  getNotificationsByUtilisateur,
  getNotificationById,
  updateNotification,
  deleteNotification,
};
