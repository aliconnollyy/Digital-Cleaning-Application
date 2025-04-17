const express = require('express');
const labDataController = require('../controllers/labDataController');  // Import controller

const router = express.Router();

router.get('/positive-lab-results/:mrn', labDataController.fetchPositiveLabResultsByMRN);

router.get('/patient-mrn/:ward_number/:bed_number', labDataController.fetchPatientMRNByWardAndBedNumber);

module.exports = router;  // Export the router to be used in app.js or index.js
