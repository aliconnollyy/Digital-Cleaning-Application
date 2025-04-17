const express = require('express');
const ppeDetailsController = require('../controllers/ppeDetailsController');  // Import controller

const router = express.Router();

router.get('/ppe-details/:pathogenId', ppeDetailsController.fetchPPEDetailsByPathogenID);

router.get('/ppe-routine', ppeDetailsController.fetchPPERoutine);

module.exports = router;  // Export the router to be used in app.js or index.js
