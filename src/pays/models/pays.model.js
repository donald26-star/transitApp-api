const mongoose = require('mongoose');

const paysSchema = new mongoose.Schema({
    code: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        uppercase: true
    },
    nom: { 
        type: String, 
        required: true,
        trim: true 
    },
    capitale: { 
        type: String, 
        trim: true 
    },
    continent: { 
        type: String, 
        trim: true 
    },
    devise: { 
        type: String, 
        trim: true 
    },
    fuseau_horaire: { 
        type: String, 
        trim: true 
    },
    status: { 
        type: String, 
        default: '1' 
    }
}, {
    timestamps: true
});

const Pays = mongoose.model('acl_pays', paysSchema);
module.exports.Pays = Pays;
