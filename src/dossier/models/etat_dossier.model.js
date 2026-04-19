const mongoose = require('mongoose');

const etatDossierSchema = new mongoose.Schema({
    label: { type: String, required: true, trim: true }, // e.g., "Ouvert", "Affecté au déclarant"
    code: { type: String, required: true, unique: true }, // e.g., "OUVERT", "AFFECTE_DECLARANT"
    couleur: { type: String, default: "#CCCCCC" }, // badge color
    ordre: { type: Number, default: 0 }, // For ordering the workflow steps
    roles_autorises: [{ type: String }], // Which roles can act/see on this status, or ["*"] for all
    role_suivant: { type: String }, // Role that should handle the dossier next
    status: { type: String, default: '1', enum: ["0", "1", "-1"] }
}, {
    timestamps: true
});

etatDossierSchema.methods.formatResponse = function () {
    const data = this.toObject();
    delete data._id;
    delete data.__v;
    return data;
};

const EtatDossier = mongoose.model('acl_etat_dossiers', etatDossierSchema);
module.exports.EtatDossier = EtatDossier;
