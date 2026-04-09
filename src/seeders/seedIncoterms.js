const mongoose = require('mongoose');
const Incoterm = require('../incoterm/models/incoterm');
const { connectDB } = require('../config/db');

const incoterms = [
    { code: 'CFR', libelle: 'COUT ET FRET' },
    { code: 'CIF', libelle: 'COUT, ASSURANCE ET FRET' },
    { code: 'CIP', libelle: 'PORT ET ASSURANCE PAYES' },
    { code: 'CPT', libelle: 'PORT PAYE JUSQU’À' },
    { code: 'DAF', libelle: 'RENDU A LA FRONTIERE' },
    { code: 'DAP', libelle: 'RENDU AU LIEU DE DESTINATION' },
    { code: 'DDP', libelle: 'RENDU DROITS ACQUITTES' },
    { code: 'DDU', libelle: 'RENDU DROITS DUS' },
    { code: 'DEQ', libelle: 'RENDU A QUAI' },
    { code: 'DES', libelle: 'RENDU NON DECHARGE' },
    { code: 'EXW', libelle: 'EN USINE, A L\'USINE' },
    { code: 'FAS', libelle: 'FRANCO LE LONG DU NAVIRE' },
    { code: 'FCA', libelle: 'FRANCO TRANSPORTEUR' },
    { code: 'FOB', libelle: 'FRANCO A BORD' }
];

const seedIncoterms = async () => {
    try {
        await connectDB();
        
        // Supprimer les anciens incoterms pour éviter les doublons
        await Incoterm.deleteMany();
        console.log('Anciens incoterms supprimés.');

        // Insérer les nouveaux incoterms
        await Incoterm.insertMany(incoterms);
        console.log('Nouveaux incoterms insérés avec succès !');

        mongoose.connection.close();
    } catch (error) {
        console.error('Erreur lors du seeding des incoterms :', error);
        process.exit(1);
    }
};

seedIncoterms();
