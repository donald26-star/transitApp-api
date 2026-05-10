const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoice.controller');
const invoiceConfigController = require('../controllers/invoiceConfig.controller');

// CRUD INVOICE CONFIG (Footer)
router.get('/config/details', invoiceConfigController.getInvoiceConfig);
router.post('/config/save', invoiceConfigController.saveInvoiceConfig);

// CRUD INVOICE
router.post('/from-dossier/:dossierCode', invoiceController.createFromDossier);
router.put('/:id', invoiceController.updateInvoice);
router.get('/', invoiceController.getInvoices);
router.get('/trash', invoiceController.getInvoicesTrash);
router.get('/:id', invoiceController.getInvoiceById);
router.get('/:id/render', invoiceController.renderInvoice);
router.post('/:id/send-email', invoiceController.sendInvoiceEmail);
router.put('/:id/trash', invoiceController.trashInvoice);
router.put('/:id/restore', invoiceController.restoreInvoice);
router.delete('/:id', invoiceController.hardDeleteInvoice);

module.exports = router;

