const cleaningLogModel = require("../models/cleaningLogModels");

async function createCleaningLogEntry(taskId, date, time, complete) {
    try {
        return await cleaningLogModel.createCleaningLogEntry(taskId, date, time, complete);
    } catch (err) {
        console.error('Error creating cleaning log entry:', err.message);
        throw new Error('Failed to create cleaning log entry');
    }
}

async function getLastCleanInfo(ward_number, bed_number) {
    try {
        const protocol = await cleaningLogModel.getLastCleanInfo(ward_number, bed_number);
        return protocol;  // Return the extended protocol details
    } catch (err) {
        console.error('Error fetching last cleaned info:', err.message);
        throw new Error('Failed to fetch last cleaned info');
    }
}

async function getMissedCleaning(date, complete) {
    try {
        const missedCleaning = await cleaningLogModel.getMissedCleaning(date, complete);
        return missedCleaning;
        return rows;
    } catch (err) {
        console.error('Error fetching missed cleaning:', err.message);
        throw new Error('Failed to fetch missing cleaning');
    }
}

module.exports = { createCleaningLogEntry, getLastCleanInfo, getMissedCleaning };