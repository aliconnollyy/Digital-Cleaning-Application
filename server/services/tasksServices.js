const tasksModel = require('../models/tasksModel'); 

async function getTasks() {
    try {
        const tasks = await tasksModel.getTasks();
        return tasks;  
    } catch (err) {
        console.error('Error fetching tasks:', err.message);
        throw new Error('Failed to fetch tasks');
    }
}

async function getTasksById(id) {
    try {
        const response = await tasksModel.getTasksById(id);
        return response;
    } catch (err) {
        console.error('Error fetching tasks by id:', err.message);
        throw new Error('Failed to fetch tasks by id');
    }
}

async function getTasksByWardNumberAndBedNumber(ward_number, bed_number) {
    try {
        const response = await tasksModel.getTasksByWardNumberAndBedNumber(ward_number, bed_number);
        return response;
    } catch (err) {
        console.error('Error fetching tasks by ward number:', err.message);
        throw new Error('Failed to fetch tasks by ward number');
    }
}

async function getTasksByWardNumber(ward_number) {
    try {
        const wardNumber = await tasksModel.getTasksByWardNumber(ward_number);
        return wardNumber;
    } catch (err) {
        console.error('Error fetching tasks by ward number:', err.message);
        throw new Error('Failed to fetch tasks by ward number');
    }
}

async function getTasksByWardNumberSpecialised(ward_number) {
    try {
        const wardNumber = await tasksModel.getTasksByWardNumberSpecialised(ward_number);
        return wardNumber;
    } catch (err) {
        console.error('Error fetching tasks by ward number:', err.message);
        throw new Error('Failed to fetch tasks by ward number');
    }
}

async function getPreviousDayTaskNotes(date_created, ward_number, bed_number) {
    try {
        const notes = await tasksModel.getPreviousDayTaskNotes(date_created, ward_number, bed_number);
        return notes;
        return result;
    } catch (err) {
        console.error('Error fetching notes:', err.message);
        throw new Error('Failed to fetch notes');
    }
    
}

async function getTasksByWardNumberRoutine(ward_number) {
    try {
        const wardNumber = await tasksModel.getTasksByWardNumberRoutine(ward_number);
        return wardNumber;
    } catch (err) {
        console.error('Error fetching tasks by ward number:', err.message);
        throw new Error('Failed to fetch tasks by ward number');
    }
}

async function insertTask(
    protocol_name,
    cleaning_agent,
    preparation,
    adjunct,
    mask,
    clothing,
    gloves,
    eye_protection,
    hand_hygiene,
    single_use,
    stream,
    ward_number,
    bed_number,
    staff_first_name,
    date_created, 
    time_created,
    notes,
    staff_last_name,
    last_updated_date,
    last_updated_time,
    time_to_complete,
    complete
) {
    try {
        // Call the model's insertTask method to insert the task into the database
        return await tasksModel.insertTask(
            protocol_name, cleaning_agent, preparation, adjunct, mask, clothing, gloves, eye_protection, hand_hygiene, single_use, stream, ward_number, bed_number, staff_first_name, date_created, time_created, notes, staff_last_name, last_updated_date, last_updated_time, time_to_complete, complete
        );
    } catch (err) {
        console.error('Error inserting new task:', err.message);
        throw new Error('Failed to insert new task');
    }
}

async function insertStaffInfo(staff_first_name, staff_last_name, staff_id)
 {
    try {
        // Call the model's insertTask method to insert the task into the database
        return await tasksModel.insertTask(staff_first_name, staff_last_name, staff_id);
    } catch (err) {
        console.error('Error inserting new task staff info:', err.message);
        throw new Error('Failed to insert new task staff info');
    }
}

async function modifyTask(protocol_name, cleaning_agent, preparation, adjunct, mask, clothing, gloves, eye_protection,
    hand_hygiene, single_use, stream, staff_first_name, date_created, time_created, notes, staff_last_name,
    last_updated_date, last_updated_time, time_to_complete, complete, ward_number, bed_number) {
    try {
        // Call the model's insertTask method to insert the task into the database
        return await tasksModel.modifyTask(
            protocol_name, cleaning_agent, preparation, adjunct, mask, clothing, gloves, eye_protection,
                hand_hygiene, single_use, stream, staff_first_name, date_created, time_created, notes, staff_last_name,
                last_updated_date, last_updated_time, time_to_complete, complete, ward_number, bed_number
        );
    } catch (err) {
        console.error('Error modifying new task:', err.message);
        throw new Error('Failed to modify new task');
    }
}

async function insertComplete(complete, ward_number, bed_number) {
    try {
        return await tasksModel.insertComplete(complete, ward_number, bed_number);
    } catch (err) {
        console.error('Error inserting complete:', err.message);
        throw new Error('Failed to insert complete');
    }
}

async function insertNote(note, ward_number, bed_number) {
    try {
        return await tasksModel.insertNote(note, ward_number, bed_number);
    } catch (err) {
        console.error('Error inserting note:', err.message);
        throw new Error('Failed to insert note');
    }
}
async function insertScheduleInfo(staff_id, staff_first_name, staff_last_name, staff_end_time, id) {
    try {
        return await tasksModel.insertScheduleInfo(staff_id, staff_first_name, staff_last_name, staff_end_time, id);
    } catch (err) {
        console.error('Error inserting task schedule info:', err.message);
        throw new Error('Failed to insert task schedule info');
    }
}

module.exports = { getTasksByWardNumberAndBedNumber, insertStaffInfo, getTasksById, insertTask, modifyTask, getTasks, getTasksByWardNumber, getTasksByWardNumberSpecialised, getTasksByWardNumberRoutine, insertComplete, insertNote, insertScheduleInfo, getPreviousDayTaskNotes };
