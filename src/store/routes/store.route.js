const express = require('express');
const { registerDynamique, getOneDynamique, getDynamiqueInfoByMenu, getDynamiqueListe, updateDynamqique, deleteDynamque } = require('../controllers/store.controller');
const router = express.Router();

router.post('/v1/add', registerDynamique);                                  // Créer une donnée dynamique
router.get('/v1/dynamique', getDynamiqueListe);                             // Lister tous les menus dynamiques
router.get('/v1/dynamique/:code_dynamique/:menu', getOneDynamique);         // Détail d'un enregistrement
router.get('/v1/dynamiqueData/:menu', getDynamiqueInfoByMenu);              // Tous les enregistrements d'un menu
router.put('/v1/update/dynamique/:code_dynamique', updateDynamqique);       // Mise à jour
router.delete('/v1/dynamique/:code_dynamique/:menu', deleteDynamque);       // Suppression

module.exports = router;


