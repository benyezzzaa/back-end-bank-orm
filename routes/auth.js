// routes/auth.js
const express = require('express');
const router = express.Router();
const { verifyClient, adminCheck } = require('../controllers/authController');

router.post('/verify', verifyClient);
router.post('/admin-check', adminCheck);
router.post('/add-prospect', addProspectClient);
module.exports = router;
