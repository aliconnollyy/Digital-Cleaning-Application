const express = require('express');
const wasteDetailsController = require('../controllers/wasteDetailsController');  // Import controller

const router = express.Router();

router.get('/waste-details/:pathogenId', wasteDetailsController.fetchWasteDetailsByPathogenID);

router.get('/waste-routine', wasteDetailsController.fetchWasteRoutine);
module.exports = router;  // Export the router to be used in app.js or index.js
