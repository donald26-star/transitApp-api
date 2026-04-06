const express = require('express');
const router = express.Router();
const deviseController = require('../controllers/devise.controller');

/**
 * Routes des Devises v1
 */

// Lister toutes les devises
router.get('/v1/devises', deviseController.getDeviseListe);

// Info spécifique
router.get('/v1/devise/:id', deviseController.getDeviseInfo);

// Ajouter
router.post('/v1/add', deviseController.registerDevise);

// Modifier
router.put('/v1/update', deviseController.updateDevise);

// Supprimer (soft delete)
router.delete('/v1/delete/:id', deviseController.deleteDevise);

module.exports = router;
