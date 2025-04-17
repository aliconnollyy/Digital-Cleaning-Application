const express = require('express');
const prioritiesController = require('../controllers/prioritiesController');  // Import controller

const router = express.Router();


router.get('/priorities/:pathogenId', prioritiesController.fetchPrioritiesByPathogenId);

module.exports = router;  // Export the router to be used in app.js or index.js
