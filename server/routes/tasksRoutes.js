const express = require('express');
const taskController = require('../controllers/tasksController');

const router = express.Router();

router.get('/tasks', taskController.fetchTasks);

router.get('/tasks-by-ward-number/:ward_number', taskController.fetchTasksByWardNumber);

router.get('/tasks-by-ward-number-specialised/:ward_number', taskController.fetchTasksByWardNumberSpecialised);

router.get('/tasks-by-ward-number-routine/:ward_number', taskController.fetchTasksByWardNumberRoutine);

router.get('/prioritised-daily-cleaning-tasks/:staff_member', taskController.getPrioritisedDailyCleaningTasks);

router.get('/staff-tasks/:id', taskController.fetchTasksById);

router.get('/previous-day-notes/:date_created/:ward_number/:bed_number', taskController.fetchPreviousDayTaskNotes);

router.get('/tasks-by-ward-and-bed-number/:ward_number/:bed_number', taskController.getTasksByWardNumberAndBedNumber);

// POST route to insert task, using query parameters
router.post('/insert-task', taskController.insertTask);

router.post('/modify-task', taskController.modifyTask);

router.post('/insert-complete', taskController.insertComplete);

router.post('/insert-note', taskController.insertNote);

router.post('/insert-task-schedule', taskController.insertScheduleInfo);

router.post('/insert-staff-info', taskController.insertStaffInfo);

module.exports = router;
