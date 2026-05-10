const { Destinataire } = require('../models/destinataire.model');

// ADD DESTINATAIRE
exports.registerDestinataire = async (req, res) => {
    try {
        const destinataire = new Destinataire(req.body);
        await destinataire.save();
        res.status(201).json({ status: true, message: 'Destinataire créé avec succès.', data: destinataire });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// GET ALL DESTINATAIRES
exports.getDestinataireListe = async (req, res) => {
    try {
        const destinataires = await Destinataire.find().populate({ path: 'pays', model: 'acl_pays' }).sort({ nom: 1 });
        res.status(200).json({ status: true, message: 'Succès.', data: destinataires });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// UPDATE DESTINATAIRE
exports.updateDestinataire = async (req, res) => {
    try {
        const { id, ...updates } = req.body;
        const destinataire = await Destinataire.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json({ status: true, message: 'Destinataire mis à jour.', data: destinataire });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

// DELETE DESTINATAIRE
exports.deleteDestinataire = async (req, res) => {
    try {
        await Destinataire.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: true, message: 'Destinataire supprimé.' });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};
