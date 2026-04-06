const { Client } = require('../models/client.model');

// ADD CLIENT
exports.registerClient = async (req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        res.status(201).json({ status: true, message: 'Client créé avec succès.', data: client });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// GET ALL CLIENTS
exports.getClientListe = async (req, res) => {
    try {
        // Peupler le pays
        const clients = await Client.find().populate({ path: 'pays', model: 'acl_pays' }).sort({ importateur: 1 });
        res.status(200).json({ status: true, message: 'Succès.', data: clients });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// UPDATE CLIENT
exports.updateClient = async (req, res) => {
    try {
        const { id, ...updates } = req.body;
        const client = await Client.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json({ status: true, message: 'Client mis à jour.', data: client });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

// DELETE CLIENT
exports.deleteClient = async (req, res) => {
    try {
        await Client.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: true, message: 'Client supprimé.' });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};
