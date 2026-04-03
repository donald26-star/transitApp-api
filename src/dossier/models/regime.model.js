const mongoose = require('mongoose');

const regimeSchema = new mongoose.Schema({
    code: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true 
    },
    libelle: { 
        type: String, 
        required: true,
        trim: true 
    },
    type: { 
        type: String, 
        enum: ['definitif', 'suspensif'],
        default: 'definitif'
    },
    description: { type: String, trim: true },
    status: { type: String, default: '1' }
}, {
    timestamps: true
});

const RegimeDouanier = mongoose.model('acl_regimes_douaniers', regimeSchema);
module.exports.RegimeDouanier = RegimeDouanier;
