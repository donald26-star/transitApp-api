const express = require('express');
const router = express.Router();
const destinataireController = require('../controllers/destinataire.controller');

/**
 * Routes des Destinataires v1
 */

router.get('/v1/destinataires', destinataireController.getDestinataireListe);
router.post('/v1/add', destinataireController.registerDestinataire);
router.put('/v1/update', destinataireController.updateDestinataire);
router.delete('/v1/delete/:id', destinataireController.deleteDestinataire);

module.exports = router;
