const mongoose = require('mongoose');

const deviseSchema = new mongoose.Schema({
    code: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        uppercase: true
    },
    libelle: { 
        type: String, 
        required: true,
        trim: true 
    },
    symbole: { 
        type: String, 
        trim: true 
    },
    taux_par_defaut: { 
        type: Number, 
        default: 1 
    },
    status: { 
        type: String, 
        default: '1' 
    }
}, {
    timestamps: true
});

const Devise = mongoose.model('acl_devises', deviseSchema);
module.exports.Devise = Devise;
