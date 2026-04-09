const mongoose = require('mongoose');

const IncotermSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    libelle: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
    collection: 'acl_incoterms'
});

module.exports = mongoose.model('Incoterm', IncotermSchema);
