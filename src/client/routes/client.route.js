const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');

/**
 * Routes des Clients v1
 */

router.get('/v1/clients', clientController.getClientListe);
router.post('/v1/add', clientController.registerClient);
router.put('/v1/update', clientController.updateClient);
router.delete('/v1/delete/:id', clientController.deleteClient);

module.exports = router;
