const taskScheduleService = require('../services/tasksScheduleServices');

async function insertTaskSchedule(req, res) {
    try {
        // Extract data from request body (req.body)
        const { task_id, staff_id, schedule_date, task_start_time, task_end_time } = req.body;

        // Call the service to insert the task
        const newTask = await taskScheduleService.insertTaskSchedule(task_id, staff_id, schedule_date, task_start_time, task_end_time);

        // Respond with success message and task ID
        res.status(201).json(newTask);

    } catch (err) {
        console.error('Error inserting task schedule:', err.message);
        res.status(500).json({ error: 'Failed to insert task schedule' });
    }
}

module.exports = { insertTaskSchedule };

