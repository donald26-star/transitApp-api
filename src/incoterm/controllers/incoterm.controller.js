const Incoterm = require('../models/incoterm');

exports.getAllIncoterms = async (req, res) => {
    try {
        const incoterms = await Incoterm.find().sort({ code: 1 });
        res.status(200).json({
            status: true,
            message: 'Succès',
            data: incoterms
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: error.message,
            data: []
        });
    }
};

exports.getIncotermById = async (req, res) => {
    try {
        const incoterm = await Incoterm.findById(req.params.id);
        if (!incoterm) return res.status(404).json({ 
            status: false,
            message: 'Incoterm non trouvé',
            data: {}
        });
        res.status(200).json({
            status: true,
            message: 'Succès',
            data: incoterm
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: error.message,
            data: {}
        });
    }
};

exports.createIncoterm = async (req, res) => {
    try {
        const newIncoterm = new Incoterm(req.body);
        await newIncoterm.save();
        res.status(201).json({
            status: true,
            message: 'Incoterm créé avec succès',
            data: newIncoterm
        });
    } catch (error) {
        res.status(400).json({ 
            status: false,
            message: error.message,
            data: {}
        });
    }
};

exports.updateIncoterm = async (req, res) => {
    try {
        const updatedIncoterm = await Incoterm.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedIncoterm) return res.status(404).json({ 
            status: false,
            message: 'Incoterm non trouvé',
            data: {}
        });
        res.status(200).json({
            status: true,
            message: 'Incoterm mis à jour avec succès',
            data: updatedIncoterm
        });
    } catch (error) {
        res.status(400).json({ 
            status: false,
            message: error.message,
            data: {}
        });
    }
};

exports.deleteIncoterm = async (req, res) => {
    try {
        const incoterm = await Incoterm.findByIdAndDelete(req.params.id);
        if (!incoterm) return res.status(404).json({ 
            status: false,
            message: 'Incoterm non trouvé',
            data: {}
        });
        res.status(200).json({ 
            status: true,
            message: 'Incoterm supprimé' ,
            data: {}
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: error.message,
            data: {}
        });
    }
};
