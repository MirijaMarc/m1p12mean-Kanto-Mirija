const mongoose = require("mongoose");

const VoitureSchema = new mongoose.Schema(
  {
    marque: { type: String, required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Voiture", VoitureSchema);

