const { Pays } = require('../models/pays.model');

// ADD PAYS
exports.registerPays = async (req, res) => {
    try {
        const { code } = req.body;
        const exists = await Pays.findOne({ code: code.toUpperCase() });
        if (exists) {
            return res.status(400).json({ status: false, message: 'Ce pays existe déjà.' });
        }
        const pays = new Pays(req.body);
        await pays.save();
        res.status(201).json({ status: true, message: 'Pays créé avec succès.', data: pays });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// GET ALL PAYS
exports.getPaysListe = async (req, res) => {
    try {
        const query = { status: '1' };
        const pays = await Pays.find(query).sort({ nom: 1 });
        res.status(200).json({ status: true, message: 'Succès.', data: pays });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// UPDATE PAYS
exports.updatePays = async (req, res) => {
    try {
        const { id, ...updates } = req.body;
        const pays = await Pays.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json({ status: true, message: 'Pays mis à jour.', data: pays });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

// DELETE PAYS (soft)
exports.deletePays = async (req, res) => {
    try {
        await Pays.findByIdAndUpdate(req.params.id, { status: '0' });
        res.status(200).json({ status: true, message: 'Pays supprimé.' });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};
