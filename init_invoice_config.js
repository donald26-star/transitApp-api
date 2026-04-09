const mongoose = require('mongoose');
const { InvoiceConfig } = require('./src/invoice/models/invoiceConfig.model');
const { connectDB } = require('./src/config/db');

const seedConfig = async () => {
    try {
        await connectDB();
        const existing = await InvoiceConfig.findOne();
        if (!existing) {
            const config = new InvoiceConfig({
                footer: "GENERAL LOGISTICS SYSTEMS SARL<br>SIEGE: PORT BOUET - ZONE AERO PORTUAIRE - Capital: 1 000 000 F CFA - 12 BP 2417 Abidjan 12 - CC N : 1744243 P<br>RCCM N : CI-ABJ-2017-B-24986 - Tél: 225 07469346 / 40191207 - E-mail : gls.ci@yahoo.com<br>BANK OF AFRICA N : CI032 01023 009385030005 85",
                status: "1"
            });
            await config.save();
            console.log("Configuration de facture initialisée.");
        } else {
            console.log("Une configuration existe déjà.");
        }
        mongoose.connection.close();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedConfig();
