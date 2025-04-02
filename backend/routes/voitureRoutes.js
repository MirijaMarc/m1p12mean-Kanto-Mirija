const express = require("express");
const {
  createVoiture,
  getVoitures,
  getVoitureById,
  updateVoiture,
  deleteVoiture,
  getAllVoitures,
} = require("../controllers/voitureController");
const { verifyRole } = require("../utils/jwt");

const router = express.Router();

router.post("/", verifyRole([3]), createVoiture);
router.get("/", verifyRole([3]), getVoitures);
router.get("/all", verifyRole([3]), getAllVoitures);
router.get("/:id", verifyRole([3]), getVoitureById);
router.put("/:id", verifyRole([3]), updateVoiture);
router.delete("/:id", verifyRole([3]), deleteVoiture);

module.exports = router;
