const express = require('express');
const router = express.Router();
const dossierController = require('../controllers/dossier.controller');

// CRUD DOSSIERS
router.post('/add', dossierController.registerDossier);
router.get('/dossiers', dossierController.getDossierListe);
router.get('/dossier/:code_dossier', dossierController.getDossierInfo);
router.get('/regimes', dossierController.getRegimes);
router.put('/update', dossierController.updateDossier);
router.put('/update-operation', dossierController.updateOperation);
router.delete('/delete/:code_dossier', dossierController.deleteDossier);

// WORKFLOW & ETATS
router.get('/etat-dossiers', dossierController.getEtatDossiers);
router.post('/change-status', dossierController.changeDossierStatus);

module.exports = router;
