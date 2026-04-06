const mongoose = require('mongoose');
const { Devise } = require('../devise/models/devise.model');
const { DB_MONGO_HOST, MONGO_DATABASE, DB_MONGO_PORT, DB_MONGO_USER, DB_MONGO_PASSWORD } = require('../config/connection');

const devisesInitiales = [
    { code: "XOF", libelle: "CFA (Franc BCEAO)", symbole: "CFA" },
    { code: "USD", libelle: "Dollar Américain", symbole: "$" },
    { code: "EUR", libelle: "Euro", symbole: "€" },
    { code: "GBP", libelle: "Livre Sterling", symbole: "£" },
    { code: "CHF", libelle: "Franc Suisse", symbole: "Fr" },
    { code: "CAD", libelle: "Dollar Canadien", symbole: "C$" },
    { code: "JPY", libelle: "Yen Japonais", symbole: "¥" },
    { code: "CNY", libelle: "Yuan Chinois", symbole: "元" },
    { code: "AED", libelle: "Dirham des Émirats", symbole: "DH" },
    { code: "ZAR", libelle: "Rand Sud-Africain", symbole: "R" },
    { code: "NGN", libelle: "Naira Nigérian", symbole: "₦" },
    { code: "GHS", libelle: "Cedi Ghanéen", symbole: "₵" },
    { code: "MAD", libelle: "Dirham Marocain", symbole: "DH" },
    { code: "XAF", libelle: "FCFA (BEAC)", symbole: "FCFA" },
    { code: "INR", libelle: "Roupie Indienne", symbole: "₹" },
    { code: "TRY", libelle: "Livre Turque", symbole: "₺" },
];

async function seedDevises() {
    try {
        let dbUrl;
        if (DB_MONGO_USER && DB_MONGO_PASSWORD) {
            dbUrl = `mongodb://${DB_MONGO_USER}:${DB_MONGO_PASSWORD}@${DB_MONGO_HOST}:${DB_MONGO_PORT}/${MONGO_DATABASE}?authSource=admin`;
        } else {
            dbUrl = `mongodb://${DB_MONGO_HOST}:${DB_MONGO_PORT}/${MONGO_DATABASE}`;
        }

        console.log(`Connexion à MongoDB pour le seeding des devises...`);
        await mongoose.connect(dbUrl);

        console.log("Suppression des anciennes devises...");
        await Devise.deleteMany({});

        console.log(`Insertion de ${devisesInitiales.length} devises...`);
        await Devise.insertMany(devisesInitiales);

        console.log("Seeding des devises terminé avec succès !");
        process.exit(0);
    } catch (error) {
        console.error("Erreur lors du seeding des devises:", error);
        process.exit(1);
    }
}

seedDevises();
