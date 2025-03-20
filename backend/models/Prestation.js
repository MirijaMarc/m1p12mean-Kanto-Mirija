const mongoose = require("mongoose");

const PrestationSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    tarifs: [ {
      montant: { type: Number, required: true },
      dateModification: { type: Date, default: Date.now },
    },],
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prestation", PrestationSchema);
