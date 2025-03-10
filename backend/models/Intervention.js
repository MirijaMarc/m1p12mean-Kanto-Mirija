const mongoose = require("mongoose");

const IntervationSchema = new mongoose.Schema(
  {
    dateIntervention: { type: Date, required: true },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true,
    },
    voiture: { type: Object, required: true },
    prestationId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Prestation" }],
    statut: { type: Number, required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Intervation", IntervationSchema);
