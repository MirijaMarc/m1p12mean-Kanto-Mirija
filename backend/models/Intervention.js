const mongoose = require("mongoose");

const InterventionSchema = new mongoose.Schema(
  {
    dateIntervention: { type: Date, required: true },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true,
    },
    description: { type: String },
    voiture: { type: Object, required: true },
    prestationsId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prestation",
        required: true,
      },
    ],
    mecaniciensId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Utilisateur",
      },
    ],
    statut: { type: Number, required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

InterventionSchema.statics.getLabelStatut = (statut) => {
  switch (statut) {
    case 1:
      return "En attente";
    case 2:
      return "En cours";
    case 3:
      return "Annulée";
    case 4:
      return "Terminée";
    default:
      return "Inconnu";
  }
};

module.exports = mongoose.model("Intervention", InterventionSchema);
