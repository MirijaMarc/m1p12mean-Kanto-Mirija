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
  getNbInterventionByStatut,
  getNbTotalPrestations,
  getNbTotalPrestationsParJour,
  getNbTotalPrestationsParType,
  getTotalMontantInterventions,
} = require("../controllers/interventionController");

const router = express.Router();

router.get("/prochaine", getProchaineIntervention);
router.get("/client", getInterventionsByClient);
router.get("/mecanicien", getInterventionsByMecanicien);
router.get("/nb-prestations", getNbTotalPrestations);
router.get("/nb-prestations-jour", getNbTotalPrestationsParJour);
router.get("/nb-prestations-type", getNbTotalPrestationsParType);
router.get("/montant-total", getTotalMontantInterventions);
router.get("/nb-statut", getNbInterventionByStatut);
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
