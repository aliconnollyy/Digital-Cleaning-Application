const express = require('express');
const staffController = require('../controllers/staffController');

const router = express.Router();


router.get('/staff-schedules/:position/:date/:shift_type', staffController.fetchStaffSchedules);

router.get('/floating-staff/:position/:shift_type', staffController.fetchFloatingStaff);

// Define API route to assign tasks to all staff
router.get('/assigned-tasks', staffController.assignTasksToStaff);

module.exports = router;
