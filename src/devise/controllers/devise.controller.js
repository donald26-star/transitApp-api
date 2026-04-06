const { Devise } = require('../models/devise.model');

// ADD DEVISE
exports.registerDevise = async (req, res) => {
    try {
        const { code } = req.body;
        const existingDevise = await Devise.findOne({ code: code.toUpperCase() });
        if (existingDevise) {
            return res.status(400).json({ 
                status: false,
                message: 'Cette devise existe déjà.',
                data: {}
            });
        }

        const devise = new Devise(req.body);
        await devise.save();

        res.status(201).json({
            status: true,
            message: 'Devise créée avec succès.',
            data: devise,
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: error.message || 'Une erreur interne est survenue.',
            data: {}
        });
    }
};

// GET ALL DEVISES
exports.getDeviseListe = async (req, res) => {
    try {
        const devises = await Devise.find({ status: '1' }).sort({ code: 1 });
        res.status(200).json({
            status: true,
            message: 'Succès.',
            data: devises
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: error.message || 'Une erreur interne est survenue.',
            data: []
        });
    }
};

// GET DETAILS DEVISE
exports.getDeviseInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const devise = await Devise.findById(id);
        if (!devise) {
            return res.status(404).json({ 
                status: false,
                message: 'Devise non trouvée.',
                data: {}
            });
        }

        res.status(200).json({
            status: true,
            message: 'Succès.',
            data: devise
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: error.message || 'Une erreur interne est survenue.',
            data: {}
        });
    }
};

// UPDATE DEVISE
exports.updateDevise = async (req, res) => {
    try {
        const { id, ...updates } = req.body;
        const devise = await Devise.findByIdAndUpdate(id, updates, { new: true });
        if (!devise) {
            return res.status(404).json({ 
                status: false,
                message: 'Devise non trouvée.',
                data: {}
            });
        }

        res.status(200).json({
            status: true,
            message: 'Devise mise à jour avec succès.',
            data: devise,
        });
    } catch (error) {
        res.status(400).json({ 
            status: false,
            message: error.message || 'Une erreur interne est survenue.',
            data: {}
        });
    }
};

// DELETE DEVISE
exports.deleteDevise = async (req, res) => {
    try {
        const { id } = req.params;
        const devise = await Devise.findByIdAndUpdate(id, { status: '0' });
        if (!devise) {
            return res.status(404).json({
                status: false,
                message: 'Devise non trouvée.',
                data: {}
            });
        }

        res.status(200).json({
            status: true,
            message: 'Devise supprimée avec succès.',
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Une erreur interne est survenue.",
            data: {}
        });
    }
};
