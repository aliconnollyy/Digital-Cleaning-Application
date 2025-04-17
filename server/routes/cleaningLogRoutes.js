const express = require("express");
const cleaningLogController = require("../controllers/cleaningLogControllers");

const router = express.Router();

router.post("/cleaning-log", cleaningLogController.createCleaningLogEntry);

router.get('/last-clean-info/:ward_number/:bed_number', cleaningLogController.fetchLastCleanInfo);

router.get('/missed-cleaning/:date/:complete', cleaningLogController.fetchMissedCleaning);

module.exports = router;
