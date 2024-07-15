const express = require('express');
const router = express.Router();
const { moveClientToProspect } = require('../controllers/clientsController');

router.post('/move-client-to-prospect', moveClientToProspect);

module.exports = router;
