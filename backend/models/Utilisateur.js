const mongoose = require("mongoose");

const UtilisateurSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    motDePasse: { type: String, required: true },
    telephone: { type: String },
    role: [
      {
        id: { type: Number },
        label: { type: String },
      },
    ],
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Utilisateur", UtilisateurSchema);
