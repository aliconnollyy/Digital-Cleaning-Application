const { query } = require("./dbConnection");

async function createCleaningLogEntry(taskId, date, time, complete) {
    try {
        const sql = `INSERT INTO cleaning_log (task_id, date, time, complete) VALUES (?, ?, ?, ?)`;
        const result = await query(sql, [taskId, date, time, complete]);
        return { id: result.insertId, taskId, date, time, complete };
    } catch (err) {
        console.error("Error inserting into cleaning log:", err.message);
        throw new Error("Failed to insert into cleaning log");
    }
}

async function getLastCleanInfo (ward_number, bed_number) {
    try {
        const sql = `
        SELECT
            t.id AS task_id,
            t.protocol_name,
            t.cleaning_agent,
            t.preparation,
            t.adjunct,
            t.mask,
            t.clothing,
            t.gloves,
            t.eye_protection,
            t.hand_hygiene,
            t.single_use,
            t.stream,
            t.ward_number,
            t.bed_number,
            t.staff_first_name,
            t.staff_last_name,
            t.date_created,
            t.time_created,
            t.notes AS task_notes,
            t.last_updated_date,
            t.last_updated_time,
            t.time_to_complete,
            t.complete AS task_complete,
            cl.time AS log_time_completed,
            cl.date AS log_date_completed
        FROM
            tasks t
        JOIN
            cleaning_log cl ON t.id = cl.task_id
        WHERE
            t.ward_number = ?
            AND t.bed_number = ?

        `;
        const rows = await query(sql, [ward_number, bed_number]);
        return rows;
    } catch (err) {
        console.error('Error fetching last clean info:', err.message);
        throw new Error('Failed to fetch last clean info');
    }
}

async function getMissedCleaning(date, complete) {
    try {
        const sql = 'SELECT * FROM cleaning_log WHERE date = ? AND complete = ?';

        const rows = await query(sql, [date, complete]);
        return rows;
    } catch (err) {
        console.error('Error fetching missed cleaning:', err.message);
        throw new Error('Failed to fetch missing cleaning');
    }
}






module.exports = { createCleaningLogEntry, getLastCleanInfo, getMissedCleaning };
