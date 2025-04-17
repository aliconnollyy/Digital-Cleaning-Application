const { query } = require('./dbConnection');
  

async function insertTaskSchedule(task_id, staff_id, schedule_date, task_start_time, task_end_time) {
    try {
        const sql = `
            INSERT INTO schedule (task_id, staff_id, schedule_date, task_start_time, task_end_time)
            VALUES (?, ?, ?, ?, ?)
        `;

        const result = await query(sql, [task_id, staff_id, schedule_date, task_start_time, task_end_time]);

        return result;
    } catch (err) {
        console.error('Error inserting task schedule:', err.message);
        throw new Error('Failed to insert task schedule');
    }
}

module.exports = { insertTaskSchedule }