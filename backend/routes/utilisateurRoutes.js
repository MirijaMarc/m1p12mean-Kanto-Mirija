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
} = require("../controllers/utilisateurController");

const router = express.Router();

router.post("/connexion", connexion);
router.get("/mecaniciens", getMecaniciens);
router.get("/clients", getClients);
router.patch("/:id/set-mecanicien", setRoleMecanicien);
router.post("/", inscription);
router.get("/", getUtilisateurs);
router.get("/:id", getUtilisateurById);
router.put("/:id", updateUtilisateur);
router.delete("/:id", deleteUtilisateur);

module.exports = router;
