const express = require('express');
const router = express.Router();
const prospectController = require('../controllers/prospectController');

// POST /move-client-to-prospect
router.post('/move-client-to-prospect', prospectController.moveClientToProspect);

module.exports = router;