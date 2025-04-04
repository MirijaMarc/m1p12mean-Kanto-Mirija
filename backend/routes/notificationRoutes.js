const express = require("express");
const {
  getNotificationsByUtilisateur,
  getNotificationById,
  updateNotification,
  deleteNotification,
  marquerLuNotification,
  toutMarquerLuNotification,
  getNotifications,
} = require("../controllers/notificationController");
const { verifyRole } = require("../utils/jwt");

const router = express.Router();

router.get("/", getNotifications);
router.get("/utilisateurs/:utilisateurId", getNotificationsByUtilisateur);
router.patch("/:id/lue", marquerLuNotification);
router.patch("/utilisateurs/:utilisateurId/lues", toutMarquerLuNotification);
router.get("/:id", getNotificationById);
router.put("/:id", updateNotification);
router.delete("/:id", deleteNotification);

module.exports = router;
