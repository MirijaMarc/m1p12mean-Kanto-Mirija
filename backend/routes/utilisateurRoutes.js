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
} = require("../controllers/utilisateurController");

const router = express.Router();

router.post("/connexion", connexion);
router.get("/mecaniciens", getMecaniciens);
router.get("/clients", getClients);
router.get("/clients/total", getNbClients);
router.patch("/:id/set-mecanicien", setRoleMecanicien);
router.patch("/:id/set-manager", setRoleManager);
router.post("/", inscription);
router.get("/", getUtilisateurs);
router.get("/:id", getUtilisateurById);
router.put("/:id", updateUtilisateur);
router.delete("/:id", deleteUtilisateur);
// router.get("/clients/total", verifyRole([1, 3]), getNbClients);

module.exports = router;
