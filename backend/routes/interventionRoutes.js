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
  getMontantTotalInterventions,
  getNbTotalInterventionsRealisees,
  getMontantTotalInterventionsParMois,
  getNbTotalInterventionsParMois,
  getAllInterventionsByClient,
  getAllInterventionsByMecanicien,
  getAllInterventions,
} = require("../controllers/interventionController");
const { verifyRole } = require("../utils/jwt");

const router = express.Router();

router.get("/prochaine", getProchaineIntervention);
router.get("/client", getInterventionsByClient);
router.get("/mecanicien", verifyRole([2, 3]), getInterventionsByMecanicien);
router.get("/all/client", getAllInterventionsByClient);
router.get(
  "/all/mecanicien",
  verifyRole([2, 3]),
  getAllInterventionsByMecanicien
);
router.get("/all", verifyRole([3]), getAllInterventions);
router.get("/montant-total", verifyRole([3]), getMontantTotalInterventions);
router.get(
  "/montant-total-mois",
  verifyRole([3]),
  getMontantTotalInterventionsParMois
);
router.get("/total", verifyRole([3]), getNbTotalInterventionsRealisees);
router.get("/total-mois", verifyRole([3]), getNbTotalInterventionsParMois);
router.get("/nb-prestations", verifyRole([3]), getNbTotalPrestations);
router.get(
  "/nb-prestations-jour",
  verifyRole([3]),
  getNbTotalPrestationsParJour
);
router.get(
  "/nb-prestations-type",
  verifyRole([3]),
  getNbTotalPrestationsParType
);
router.get("/nb-statut", verifyRole([3]), getNbInterventionByStatut);
router.patch(
  "/:id/mecaniciens",
  verifyRole([3]),
  assignerMecaniciensIntervention
);
router.post("/", newIntervention);
router.get("/", verifyRole([3]), getInterventions);
router.get("/:id", getInterventionById);
router.put("/:id", updateIntervention);
router.delete("/:id", deleteIntervention);
router.patch("/:id/annuler", annulerIntervention);
router.patch("/:id/commencer", verifyRole([2, 3]), commencerIntervention);
router.patch("/:id/terminer", verifyRole([2, 3]), terminerIntervention);

module.exports = router;
