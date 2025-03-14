const express = require("express");
const {
  newIntervention,
  getInterventions,
  getInterventionById,
  updateIntervention,
  deleteIntervention,
  annulerIntervention,
  getProchaineIntervention,
  commencerIntervention,
  terminerIntervention,
  getInterventionsByClient,
  getInterventionsByMecanicien,
  assignerMecaniciensIntervention,
} = require("../controllers/interventionController");

const router = express.Router();

router.get("/prochaine", getProchaineIntervention);
router.get("/client", getInterventionsByClient);
router.get("/mecanicien", getInterventionsByMecanicien);
router.patch("/:id/mecaniciens", assignerMecaniciensIntervention);
router.post("/", newIntervention);
router.get("/", getInterventions);
router.get("/:id", getInterventionById);
router.put("/:id", updateIntervention);
router.delete("/:id", deleteIntervention);
router.patch("/:id/annuler", annulerIntervention);
router.patch("/:id/commencer", commencerIntervention);
router.patch("/:id/terminer", terminerIntervention);

module.exports = router;
