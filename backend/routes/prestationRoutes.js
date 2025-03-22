const express = require("express");
const {
  createPrestation,
  getPrestations,
  getPrestationById,
  updatePrestation,
  deletePrestation,
  recherchePrestations,
} = require("../controllers/prestationController");

const router = express.Router();

router.post("/", createPrestation);
router.get("/", getPrestations);
router.get("/:id", getPrestationById);
router.put("/:id", updatePrestation);
router.delete("/:id", deletePrestation);

module.exports = router;
