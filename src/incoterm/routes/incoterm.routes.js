const express = require('express');
const router = express.Router();
const incotermController = require('../controllers/incoterm.controller');

/**
 * Routes des Incoterms v1
 */

// Lister
router.get('/v1/incoterms', incotermController.getAllIncoterms);

// Détail
router.get('/v1/incoterm/:id', incotermController.getIncotermById);

// Ajouter
router.post('/v1/add', incotermController.createIncoterm);

// Modifier
router.put('/v1/update/:id', incotermController.updateIncoterm);

// Supprimer
router.delete('/v1/delete/:id', incotermController.deleteIncoterm);

module.exports = router;
