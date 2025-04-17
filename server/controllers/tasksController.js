const tasksService = require('../services/tasksServices');
const { handleDailyCleaning } = require('../utils/handleCleaningUtils');

async function fetchTasks(req, res) {
    try {
        const taskDetails = await tasksService.getTasks();
        res.status(200).json(taskDetails);  // Send the result as a JSON response
    } catch (err) {
        console.error('Error fetching tasks', err.message);
        res.status(500).json({ error: 'Failed to fetch tasks' });  // Handle errors
    }
}

async function fetchTasksByWardNumber(req, res) {
    try {
        const ward_number = req.params.ward_number;
        const taskDetails = await tasksService.getTasksByWardNumber(ward_number);
        res.status(200).json(taskDetails);  // Send the result as a JSON response
    } catch (err) {
        console.error('Error fetching tasks by ward number', err.message);
        res.status(500).json({ error: 'Failed to fetch tasks by ward number' });  // Handle errors
    }
}

async function fetchTasksById(req, res) {
    try {
        const id = req.params.id;
        const taskDetails = await tasksService.getTasksById(id);
        res.status(200).json(taskDetails);  // Send the result as a JSON response
    } catch (err) {
        console.error('Error fetching tasks by id', err.message);
        res.status(500).json({ error: 'Failed to fetch tasks by id' });  // Handle errors
    }
}

async function fetchPreviousDayTaskNotes(req, res) {
    try {
        const date_created = req.params.date_created;
        const ward_number = req.params.ward_number;
        const bed_number = req.params.bed_number;
        const notesDetails = await tasksService.getPreviousDayTaskNotes(date_created, ward_number, bed_number);
        res.status(200).json(notesDetails);
    } catch (err) {
        console.error('Error fetching notes:', err.message);
        throw new Error('Failed to fetch notes');
    }
    
}

async function fetchTasksByWardNumberSpecialised(req, res) {
    try {
        const ward_number = req.params.ward_number;
        const taskDetails = await tasksService.getTasksByWardNumberSpecialised(ward_number);
        res.status(200).json(taskDetails);  // Send the result as a JSON response
    } catch (err) {
        console.error('Error fetching tasks by ward number', err.message);
        res.status(500).json({ error: 'Failed to fetch tasks by ward number' });  // Handle errors
    }
}

async function fetchTasksByWardNumberRoutine(req, res) {
    try {
        const ward_number = req.params.ward_number;
        const taskDetails = await tasksService.getTasksByWardNumberRoutine(ward_number);
        res.status(200).json(taskDetails);  // Send the result as a JSON response
    } catch (err) {
        console.error('Error fetching tasks by ward number', err.message);
        res.status(500).json({ error: 'Failed to fetch tasks by ward number' });  // Handle errors
    }
}

const getPrioritisedDailyCleaningTasks = async (req, res) => {
    try {
        const staff_member = req.params.staff_member;
        const tasks = await handleDailyCleaning(staff_member);
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error in controller:", error); // This will log the entire error object
        res.status(500).json({ message: "Internal Server Error", error: error.toString() });
    }
};

const getTasksByWardNumberAndBedNumber = async (req, res) => {
    try {
        const ward_number = req.params.ward_number;
        const bed_number = req.params.bed_number;
        const tasks = await tasksService.getTasksByWardNumberAndBedNumber(ward_number, bed_number);
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error in controller:", error); // This will log the entire error object
        res.status(500).json({ message: "Internal Server Error", error: error.toString() });
    }
};


async function insertTask(req, res) {
    try {
        // Extract data from request body (req.body)
        const { 
            protocol_name, cleaning_agent, preparation, adjunct, mask, clothing, gloves, eye_protection, hand_hygiene, single_use, stream, ward_number, bed_number, staff_first_name, date_created, time_created, notes, staff_last_name, last_updated_date, last_updated_time, time_to_complete, complete
        } = req.body;

        // // Check if all fields are provided
        // if (!protocol_name || !cleaning_Agent || !preparation || !adjunct || !mask || !clothing || !gloves || !eye_protection 
        //     || !hand_hygiene || !single_Use || !stream || !ward_number || !bed_number || !staff_member || 
        //     !duration || !date_created || !time_created || !notes) {
        //     return res.status(400).json({ error: 'All fields are required to add task' });
        // }

        // Call the service to insert the task
        const newTask = await tasksService.insertTask(
            protocol_name, cleaning_agent, preparation, adjunct, mask, clothing, gloves, eye_protection, hand_hygiene, single_use, stream, ward_number, bed_number, staff_first_name, date_created, time_created, notes, staff_last_name, last_updated_date, last_updated_time, time_to_complete, complete
        );

        // Respond with success message and task ID
        res.status(201).json(newTask);

    } catch (err) {
        console.error('Error inserting task:', err.message);
        res.status(500).json({ error: 'Failed to insert task' });
    }
}

async function insertStaffInfo(req, res) {
    try {
        // Extract data from request body (req.body)
        const { staff_first_name, staff_last_name, staff_id } = req.body;

        // Call the service to insert the task
        const newTask = await tasksService.insertTask(staff_first_name, staff_last_name, staff_id);

        // Respond with success message and task ID
        res.status(201).json(newTask);

    } catch (err) {
        console.error('Error inserting task staff info:', err.message);
        res.status(500).json({ error: 'Failed to insert task staff info' });
    }
}

async function modifyTask(req, res) {
    try {
        // Extract data from request body (req.body)
        const { 
            protocol_name, cleaning_agent, preparation, adjunct, mask, clothing, gloves, eye_protection,
                hand_hygiene, single_use, stream, staff_first_name, date_created, time_created, notes, staff_last_name,
                last_updated_date, last_updated_time, time_to_complete, complete, ward_number, bed_number
        } = req.body;

        // Call the service to insert the task
        const newTask = await tasksService.modifyTask(
            protocol_name, cleaning_agent, preparation, adjunct, mask, clothing, gloves, eye_protection,
                hand_hygiene, single_use, stream, staff_first_name, date_created, time_created, notes, staff_last_name,
                last_updated_date, last_updated_time, time_to_complete, complete, ward_number, bed_number
        );

        // Respond with success message and task ID
        res.status(201).json(newTask);

    } catch (err) {
        console.error('Error modifying task:', err.message);
        res.status(500).json({ error: 'Failed to modify task' });
    }
}

async function insertComplete(req, res) {
    try {
        const { complete, ward_number, bed_number } = req.body;

        const result = await tasksService.insertComplete(complete, ward_number, bed_number);


        res.status(201).json(result);

    } catch (err) {
        console.error('Error inserting complete:', err.message);
        res.status(500).json({ error: 'Failed to insert complete' });
    }
}

async function insertNote(req, res) {
    try {
        const { note, ward_number, bed_number } = req.body;

        const result = await tasksService.insertNote(note, ward_number, bed_number);


        res.status(201).json(result);

    } catch (err) {
        console.error('Error inserting note:', err.message);
        res.status(500).json({ error: 'Failed to insert note' });
    }
}

async function insertScheduleInfo(req, res) {
    try {
        const { staff_id, staff_first_name, staff_last_name, staff_end_time, id } = req.body;

        const result = await tasksService.insertScheduleInfo(staff_id, staff_first_name, staff_last_name, staff_end_time, id);


        res.status(201).json(result);

    } catch (err) {
        console.error('Error inserting task schedule info:', err.message);
        res.status(500).json({ error: 'Failed to insert task schedule info' });
    }
}

module.exports = { getTasksByWardNumberAndBedNumber, insertStaffInfo, insertTask, fetchTasksById, modifyTask, fetchTasks, fetchTasksByWardNumber, fetchTasksByWardNumberSpecialised, fetchTasksByWardNumberRoutine, getPrioritisedDailyCleaningTasks, insertComplete, insertNote, insertScheduleInfo, fetchPreviousDayTaskNotes };
