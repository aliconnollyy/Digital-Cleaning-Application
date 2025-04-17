const express = require('express');
const taskScheduleController = require('../controllers/tasksScheduleController');

router.post('/insert-task-schedule', taskScheduleController.insertTaskSchedule);

module.exports = router;