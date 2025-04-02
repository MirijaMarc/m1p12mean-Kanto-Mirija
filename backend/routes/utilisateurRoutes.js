const express = require("express");
const {
  connexion,
  getUtilisateurs,
  getUtilisateurById,
  updateUtilisateur,
  deleteUtilisateur,
  inscription,
  setRoleMecanicien,
  getMecaniciens,
  getClients,
  getNbClients,
  setRoleManager,
  newUtilisateur,
  getAllMecaniciens,
  getAllClients,
} = require("../controllers/utilisateurController");
const { verifyRole } = require("../utils/jwt");

const router = express.Router();

router.post("/new", verifyRole([3]), newUtilisateur);
router.post("/connexion", connexion);
router.get("/mecaniciens", verifyRole([3]), getMecaniciens);
router.get("/all-mecaniciens", verifyRole([3]), getAllMecaniciens);
router.get("/clients", verifyRole([3]), getClients);
router.get("/all-clients", verifyRole([3]), getAllClients);
router.get("/clients/total", verifyRole([3]), getNbClients);
router.patch("/:id/set-mecanicien", verifyRole([3]), setRoleMecanicien);
router.patch("/:id/set-manager", verifyRole([3]), setRoleManager);
router.post("/", inscription);
router.get("/", verifyRole([3]), getUtilisateurs);
router.get("/:id", getUtilisateurById);
router.put("/:id", verifyRole([3]), updateUtilisateur);
router.delete("/:id", verifyRole([3]), deleteUtilisateur);

module.exports = router;
