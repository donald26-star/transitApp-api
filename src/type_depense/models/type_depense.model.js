const mongoose = require('mongoose');

const typeDepenseSchema = new mongoose.Schema({
    libelle: { type: String, required: true },
    montant: { type: Number, default: 0 },
    observation: { type: String, default: "" },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['0', '1'], default: '1' },
    createdAt: { type: Date, default: Date.now },
});

const TypeDepense = mongoose.model('TypeDepense', typeDepenseSchema);

module.exports = { TypeDepense };
