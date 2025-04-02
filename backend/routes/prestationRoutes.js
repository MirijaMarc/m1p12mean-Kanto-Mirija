const express = require("express");
const {
  createPrestation,
  getPrestations,
  getPrestationById,
  updatePrestation,
  deletePrestation,
  getAllPrestations,
} = require("../controllers/prestationController");
const { verifyRole } = require("../utils/jwt");

const router = express.Router();

router.post("/", verifyRole([3]), createPrestation);
router.get("/", verifyRole([3]), getPrestations);
router.get("/all", verifyRole([3]), getAllPrestations);
router.get("/:id", verifyRole([3]), getPrestationById);
router.put("/:id", verifyRole([3]), updatePrestation);
router.delete("/:id", verifyRole([3]), deletePrestation);

module.exports = router;
