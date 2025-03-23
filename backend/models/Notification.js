const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    utilisateurId: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    message: { type: String, required: true },
    dateEnvoie: { type: Date, default: Date.now },
    lu: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
