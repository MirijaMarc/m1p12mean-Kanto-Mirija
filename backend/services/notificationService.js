const Notification = require("../models/Notification");

const newNotification = async (utilisateurId, message) => {
  try {
    const notification = new Notification({ utilisateurId, message });
    await notification.save();
  } catch (error) {
    console.error("Erreur :", error);
    throw error;
  }
};

module.exports = { newNotification };
