const express = require("express");
const cleaningProtocolController = require ('../controllers/cleaningProtocolController.js');

const router = express.Router();

router.get('/cleaning-protocol-daily/:pathogenId', cleaningProtocolController.fetchDailyCleaningProtocolByPathogenID);

router.get('/cleaning-protocol-terminal/:pathogenId', cleaningProtocolController.fetchTerminalCleaningProtocolByPathogenID);

router.get('/routine-protocol-daily', cleaningProtocolController.fetchDailyRoutineProtocol);

router.get('/routine-protocol-terminal', cleaningProtocolController.fetchTerminalyRoutineProtocol);

router.get('/daily-cleaning-protocols-positive-pathogenid/:pathogenId', cleaningProtocolController.fetchDailyCleaningProtocolsByPositivePathogenID);

module.exports = router; 
