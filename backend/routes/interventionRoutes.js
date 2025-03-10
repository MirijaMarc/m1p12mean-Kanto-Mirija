const express = require("express");
const {
  createIntervention,
  getInterventions,
  getInterventionById,
  updateIntervention,
  deleteIntervention,
} = require("../controllers/interventionController");

const router = express.Router();

router.post("/", createIntervention);
router.get("/", getInterventions);
router.get("/:id", getInterventionById);
router.put("/:id", updateIntervention);
router.delete("/:id", deleteIntervention);

module.exports = router;
