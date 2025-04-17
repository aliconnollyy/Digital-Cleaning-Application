const express = require('express');
const wardDataController = require('../controllers/wardDataController');  // Import controller

const router = express.Router();

router.get('/ward-data/:ward_number', wardDataController.fetchBedsInWardByWardNumber);

module.exports = router;  // Export the router to be used in app.js or index.js
