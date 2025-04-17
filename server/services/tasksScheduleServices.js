const tasksScheduleModel = require('../models/tasksScheduleModel');

async function insertTaskSchedule(task_id, staff_id, schedule_date, task_start_time, task_end_time) {
    try {
        // Call the model's insertTask method to insert the task into the database
        return await tasksScheduleModel.insertTaskSchedule(task_id, staff_id, schedule_date, task_start_time, task_end_time);
    } catch (err) {
        console.error('Error inserting new task schedule:', err.message);
        throw new Error('Failed to insert new task schedule');
    }
}

module.exports = { insertTaskSchedule };