const express = require('express');
const router = express.Router();
const paysController = require('../controllers/pays.controller');

/**
 * Routes des Pays v1
 */

router.get('/v1/pays', paysController.getPaysListe);
router.post('/v1/add', paysController.registerPays);
router.put('/v1/update', paysController.updatePays);
router.delete('/v1/delete/:id', paysController.deletePays);

module.exports = router;
