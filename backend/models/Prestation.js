const mongoose = require("mongoose");

const PrestationSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    tarif: { type: Number },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prestation", PrestationSchema);
