const { query } = require('./dbConnection');

async function getTasks () {
    try {
        const sql = 'SELECT * FROM tasks';
        const rows = await query(sql);
        return rows;
    } catch (err) {
        console.error('Error fetching tasks:', err.message);
        throw new Error('Failed to fetch tasks');
    }
}

async function getTasksByWardNumber (ward_number) {
    try {
        const sql = 'SELECT * FROM tasks WHERE ward_number = ?';
        const rows = await query(sql, [ward_number]);
        return rows;
    } catch (err) {
        console.error('Error fetching tasks by ward number:', err.message);
        throw new Error('Failed to fetch tasks by ward number');
    }
}

async function getTasksById (id) {
    try {
        const sql = 'SELECT * FROM tasks WHERE id = ?';
        const rows = await query(sql, [id]);
        return rows;
    } catch (err) {
        console.error('Error fetching tasks by id:', err.message);
        throw new Error('Failed to fetch tasks by id');
    }
}

async function getTasksByWardNumberSpecialised (ward_number) {
    try {
        const sql = 'SELECT * FROM tasks WHERE ward_number = ? AND protocol_name != "Routine Cleaning"';
        const rows = await query(sql, [ward_number]);
        return rows;
    } catch (err) {
        console.error('Error fetching tasks by ward number:', err.message);
        throw new Error('Failed to fetch tasks by ward number');
    }
}

async function getTasksByWardNumberAndBedNumber(ward_number, bed_number) {
    try {
        const sql = 'SELECT * FROM tasks WHERE ward_number = ? AND bed_number = ? LIMIT 1';
        const rows = await query(sql, [ward_number, bed_number]);
        return rows;
    } catch (err) {
        console.error('Error fetching tasks by ward number:', err.message);
        throw new Error('Failed to fetch tasks by ward number');
    }
}

async function getTasksByWardNumberRoutine (ward_number) {
    try {
        const sql = 'SELECT * FROM tasks WHERE ward_number = ? AND protocol_name = "Routine Cleaning"';
        const rows = await query(sql, [ward_number]);
        return rows;
    } catch (err) {
        console.error('Error fetching tasks by ward number:', err.message);
        throw new Error('Failed to fetch tasks by ward number');
    }
}

async function insertTask(
    protocol_name, cleaning_agent, preparation, adjunct, mask, clothing, gloves, eye_protection, hand_hygiene, single_use, stream, ward_number, bed_number, staff_first_name, date_created, time_created, notes, staff_last_name, last_updated_date, last_updated_time, time_to_complete, complete
) {
    try {
        const sql = `
            INSERT INTO tasks (
                protocol_name, cleaning_agent, preparation, adjunct, mask, clothing, gloves, eye_protection, hand_hygiene, single_use, stream, ward_number, bed_number, staff_first_name, date_created, time_created, notes, staff_last_name, last_updated_date, last_updated_time, time_to_complete, complete
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const result = await query(sql, [
            protocol_name, cleaning_agent, preparation, adjunct, mask, clothing, gloves, eye_protection, hand_hygiene, single_use, stream, ward_number, bed_number, staff_first_name, date_created, time_created, notes, staff_last_name, last_updated_date, last_updated_time, time_to_complete, complete
        ]);

        return result;
    } catch (err) {
        console.error('Error inserting task:', err.message);
        throw new Error('Failed to insert task'); // Re-enable throwing error
    }
}


async function insertStaffInfo(staff_first_name, staff_last_name, staff_id) {
    try {
        const sql = `
            INSERT INTO tasks (staff_first_name, staff_last_name, staff_id)
            VALUES (?, ?, ?)
        `;

        const result = await query(sql, [staff_first_name, staff_last_name, staff_id]);

        return result;
    } catch (err) {
        console.error('Error inserting task staff into:', err.message);
        throw new Error('Failed to insert task staff info'); // Re-enable throwing error
    }
}


async function modifyTask(protocol_name, cleaning_agent, preparation, adjunct, mask, clothing, gloves, eye_protection,
    hand_hygiene, single_use, stream, staff_first_name, date_created, time_created, notes, staff_last_name,
    last_updated_date, last_updated_time, time_to_complete, complete, ward_number, bed_number
) {
    try {

        // Update the SQL query to correctly set the columns
        const sql = `
            UPDATE tasks SET
                protocol_name = ?, 
                cleaning_agent = ?, 
                preparation = ?, 
                adjunct = ?, 
                mask = ?, 
                clothing = ?, 
                gloves = ?, 
                eye_protection = ?, 
                hand_hygiene = ?, 
                single_use = ?, 
                stream = ?, 
                staff_first_name = ?, 
                date_created = ?, 
                time_created = ?, 
                notes = ?, 
                staff_last_name = ?, 
                last_updated_date = ?, 
                last_updated_time = ?, 
                time_to_complete = ?, 
                complete = ?
            WHERE ward_number = ? AND bed_number = ?
        `;
        
        const result = await query(sql, [
            protocol_name, cleaning_agent, preparation, adjunct, mask, clothing, gloves, eye_protection,
            hand_hygiene, single_use, stream, staff_first_name, date_created, time_created, notes, staff_last_name,
            last_updated_date, last_updated_time, time_to_complete, complete,
            ward_number, bed_number
        ]);

        // Return the number of affected rows (or any other useful information)
        return { affectedRows: result.affectedRows, protocol_name, cleaning_agent, preparation, adjunct, mask, clothing, gloves, eye_protection,
            hand_hygiene, single_use, stream, staff_first_name, date_created, time_created, notes, staff_last_name,
            last_updated_date, last_updated_time, time_to_complete, complete };
    } catch (err) {
        console.error('Error modifying task:', err.message);
        throw new Error('Failed to modify task');
    }
}

async function insertComplete(complete, ward_number, bed_number) {
    try {
        const sql = `
            UPDATE tasks SET complete = ? WHERE ward_number = ? AND bed_number = ?`;
        
        const result = await query(sql, [complete, ward_number, bed_number]);

        return { result }
    } catch (err) {
        console.error('Error inserting complete:', err.message);
        throw new Error('Failed to insert complete');
    }
}



async function insertNote(note, ward_number, bed_number) {
    try {
        const sql = `
            UPDATE tasks SET notes = ? WHERE ward_number = ? AND bed_number = ?`;
        
        const result = await query(sql, [note, ward_number, bed_number]);

        return { result }
    } catch (err) {
        console.error('Error inserting note:', err.message);
        throw new Error('Failed to insert note');
    }
}

async function insertScheduleInfo(staff_id, staff_first_name, staff_last_name, staff_end_time, id) {
    try {
        const sql = `
            UPDATE tasks 
            SET staff_id = ?, 
                staff_first_name = ?, 
                staff_last_name = ?, 
                task_end_time = ? 
            WHERE id = ?`;
        
        const result = await query(sql, [staff_id, staff_first_name, staff_last_name, staff_end_time, id]);

        return { result }
    } catch (err) {
        console.error('Error inserting task schedule info:', err.message);
        throw new Error('Failed to insert task schedule info');
    }
}

async function getPreviousDayTaskNotes(date_created, ward_number, bed_number) {
    try {
        const sql = `SELECT notes FROM tasks WHERE date_created = ? AND ward_number = ? AND bed_number = ?`;
        const result = await query(sql, [date_created, ward_number, bed_number]);
        return result;
    } catch (err) {
        console.error('Error fetching notes:', err.message);
        throw new Error('Failed to fetch notes');
    }
    
}


module.exports = { getTasksByWardNumberAndBedNumber, insertStaffInfo, getTasksById, insertTask, getTasks, getTasksByWardNumber, getTasksByWardNumberSpecialised, getTasksByWardNumberRoutine, insertComplete, insertNote, modifyTask, insertScheduleInfo, getPreviousDayTaskNotes };