const express = require('express');
const cleaningTimingsController = require('../controllers/cleaningTimingsControllers');  // Import controller

const router = express.Router();

router.get('/cleaning-timing-daily-routine', cleaningTimingsController.fetchDailyRoutineTimings);
router.get('/cleaning-timing-terminal-routine', cleaningTimingsController.fetchTerminalRoutineTimings);
router.get('/cleaning-timing-daily-specialised', cleaningTimingsController.fetchDailySpecialisedTimings);
router.get('/cleaning-timing-terminal-specialised', cleaningTimingsController.fetchTerminalSpecialisedTimings);

module.exports = router;  // Export the router to be used in app.js or index.js
