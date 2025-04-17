//// CHECKS FOR NEW LAB RESULTS EVERY 10 SECONDS ////

const { query } = require("../models/dbConnection");
const { createNewLabResultCleaningTasks } = require("../utils/handleCleaningUtils");
const { getFloatingStaff } = require("../services/staffService");
const { insertScheduleInfo, getTasksByWardNumberAndBedNumber } = require("../services/tasksServices");

let lastInsertedId = 0;
let emptyBeds;
let bedIds;

async function initialiseLastInsertedId() {
    try {
        const results = await query('SELECT MAX(id) AS maxId FROM lab_data');
        if (results.length > 0 && results[0].maxId !== null) {
            lastInsertedId = results[0].maxId;
            //console.log(`Last inserted id: ${lastInsertedId}`);
        }
    } catch (error) {
        console.error('Error initializing lastInsertedId:', error);
    }
}

async function getInitalNullMRNs() {
    try {
        emptyBeds = await query('SELECT id FROM beds WHERE patient_mrn IS NULL');
        bedIds = emptyBeds.map(bed => bed.id);
        console.log(`initial null MRNs: ${bedIds}`);

    } catch (error) {
        console.error('Error getting inital null MRNs:', error);
    }
}

async function checkForInsertions(io) {
    try {

        if (!io) {
            console.error("Error: io is undefined in checkForInsertions!");
            return;
        }

        //console.log('New lab data inserted');

        const results = await query('SELECT * FROM lab_data WHERE id > ?', [lastInsertedId]);
        let prioritisedTasksList;

        if (results.length > 0) {
            results.forEach(async row => {
                //console.log('New insertion detected:', row);

                let bed_number = row.bed_number;
                let ward_number = row.ward_number;
                let patientMRN = row.mrn;

                //const { allTasks, bedNumber, wardNumber } = await handleNewLabResultCleaning(patientMRN, bed_number, ward_number);
                const modifiedCleaningTask = await createNewLabResultCleaningTasks(patientMRN, bed_number, ward_number);

                // get a floating staff
                const floatingStaffMember = await getFloatingStaff("Floating Staff", "daily");
                const staff_first_name = floatingStaffMember.first_name;
                const staff_last_name = floatingStaffMember.last_name;

                // get task id by bed and ward number
                const task = await getTasksByWardNumberAndBedNumber(ward_number, bed_number);
                const task_id = task.id;

                // assign floating staff to task
                let newScheduleInfo = await insertScheduleInfo(floatingStaffMember.id, staff_first_name, staff_last_name, null, task_id);

                lastInsertedId = Math.max(lastInsertedId, row.id);

                // Send the update to all connected clients
                io.emit("new task update", { bed_number, ward_number, staff_first_name, staff_last_name });

                //console.log('Sent update to frontend');
                //console.log(`New lab result recieved for patient in ward: ${ward_number} bed: ${bed_number}`);
;            }); 
        }
        else {
            //console.log('No new insertions detected');
        }
    } catch (error) {
        console.error('Error checking for insertions:', error);
    }
}

async function checkForDischargedPatient(io) {
    try {

        if (!io) {
            console.error("Error: io is undefined in checkForDischargedPatient!");
            return;
        }

        // new list of ids from polling
        const emptyBeds = await query('SELECT id, bed_number, ward_id FROM beds WHERE patient_mrn IS NULL');
        const newIdList = emptyBeds.map(bed => bed.id);
        const bedWardList = emptyBeds.map(bed => ({
            bed_number: bed.bed_number,
            ward_id: bed.ward_id
        }));

        let diff;

        //console.log(`comparing ${newIdList} to ${bedIds}`);
        
        diff = newIdList.filter(n => !bedIds.includes(n));

        if(diff) {
            // new patient discharged
            // check lab data for patient status

            
        }

        if(emptyBeds) {

        }

    } catch (error) {
        console.error('Error checking for insertions:', error);
    }
}

async function startDatabasePolling(io) {
    await initialiseLastInsertedId();
    // await getInitalNullMRNs();
    setInterval(() => checkForInsertions(io), 10000);
    // setInterval(() => checkForDischargedPatient(io), 10000);
}

module.exports = { startDatabasePolling };

