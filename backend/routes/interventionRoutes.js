const express = require("express");
const {
  newIntervention,
  getInterventions,
  getInterventionById,
  updateIntervention,
  deleteIntervention,
} = require("../controllers/interventionController");

const router = express.Router();

router.post("/", newIntervention);
router.get("/", getInterventions);
router.get("/:id", getInterventionById);
router.put("/:id", updateIntervention);
router.delete("/:id", deleteIntervention);

module.exports = router;
