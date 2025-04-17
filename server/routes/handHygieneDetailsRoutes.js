const express = require('express');
const handHygieneDetailsController = require('../controllers/handHygieneDetailsController');  // Import controller

const router = express.Router();

router.get('/hand-hygiene-details/:pathogenId', handHygieneDetailsController.fetchHandHygieneDetailsByPathogenID);

router.get('/hand-hygiene-routine', handHygieneDetailsController.fetchRoutineHandHygieneDetails);

module.exports = router;  // Export the router to be used in app.js or index.js
