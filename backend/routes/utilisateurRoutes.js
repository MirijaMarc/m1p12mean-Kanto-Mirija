const express = require("express");
const {
  connexion,
  getUtilisateurs,
  getUtilisateurById,
  updateUtilisateur,
  deleteUtilisateur,
  inscription,
} = require("../controllers/utilisateurController");

const router = express.Router();

router.post("/connexion", connexion);
router.post("/", inscription);
router.get("/", getUtilisateurs);
router.get("/:id", getUtilisateurById);
router.put("/:id", updateUtilisateur);
router.delete("/:id", deleteUtilisateur);

module.exports = router;
