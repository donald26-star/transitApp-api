const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Vers quel utilisateur
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, default: 'info' }, // info, warning, success, error
    metadata: {
        dossierCode: { type: String, default: null }, // Lien facultatif vers un dossier
        action: { type: String, default: null }
    },
    status: { type: String, default: 'unread', enum: ['unread', 'read'] },
    corbeille: { type: String, default: '0', enum: ['0', '1'] }
}, {
    timestamps: true
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = { Notification };
