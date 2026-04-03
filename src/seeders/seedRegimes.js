const mongoose = require('mongoose');
const { RegimeDouanier } = require('../dossier/models/regime.model');
require('dotenv').config();

const regimes = [
    { code: "1000", libelle: "Exportation définitive", type: "definitif" },
    { code: "2200", libelle: "Perfectionnement passif", type: "suspensif" },
    { code: "3000", libelle: "Réexportation directe", type: "suspensif" },
    { code: "4000", libelle: "Mise à la consommation directe", type: "definitif" },
    { code: "5000", libelle: "Admission temporaire ordinaire", type: "suspensif" },
    { code: "7000", libelle: "Entrée en entrepôt de stockage", type: "suspensif" },
    { code: "D3", libelle: "Mise à la consommation (Import TTC)", type: "definitif" },
    { code: "D18", libelle: "Entrepôt de stockage / Admission Temporaire", type: "suspensif" },
    { code: "D56", libelle: "Admission temporaire / Matériel pro", type: "suspensif" },
    { code: "S106", libelle: "Exportation temporaire", type: "suspensif" }
];

async function seedRegimes() {
    try {
        const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/transit_api";
        await mongoose.connect(mongoUri);
        console.log("Connecté à MongoDB pour le seeding...");

        for (const r of regimes) {
            await RegimeDouanier.findOneAndUpdate(
                { code: r.code },
                r,
                { upsert: true, new: true }
            );
        }

        console.log("Seeding des régimes douaniers CI terminé avec succès !");
        process.exit(0);
    } catch (error) {
        console.error("Erreur seeding:", error);
        process.exit(1);
    }
}

seedRegimes();
