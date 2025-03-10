const express = require("express");
const {
  createVoiture,
  getVoitures,
  getVoitureById,
  updateVoiture,
  deleteVoiture,
} = require("../controllers/voitureController");

const router = express.Router();

router.post("/", createVoiture);
router.get("/", getVoitures);
router.get("/:id", getVoitureById);
router.put("/:id", updateVoiture);
router.delete("/:id", deleteVoiture);

module.exports = router;
