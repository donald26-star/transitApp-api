const express = require('express');
const router = express.Router();
const statsController = require('./stats.controller');

// GET GLOBAL STATS
router.get('/global', statsController.getGlobalStats);

module.exports = router;
