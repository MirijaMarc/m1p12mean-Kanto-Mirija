const mongoose = require("mongoose");

const IntervationSchema = new mongoose.Schema(
  {
    dateIntervention: { type: Date, required: true },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true,
    },
    description: { type: String },
    voiture: { type: Object, required: true },
    prestationsId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Prestation", required: true }],
    statut: { type: Number, required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Intervation", IntervationSchema);
