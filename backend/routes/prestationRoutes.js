const express = require("express");
const {
  createPrestation,
  getPrestations,
  getPrestationById,
  updatePrestation,
  deletePrestation,
  getAllPrestations,
} = require("../controllers/prestationController");

const router = express.Router();

router.post("/", createPrestation);
router.get("/", getPrestations);
router.get("/all", getAllPrestations);
router.get("/:id", getPrestationById);
router.put("/:id", updatePrestation);
router.delete("/:id", deletePrestation);

module.exports = router;
