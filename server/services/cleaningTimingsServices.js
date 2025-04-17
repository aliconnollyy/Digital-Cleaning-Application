const cleaningTimingsModel = require('../models/cleaningTimingsModels');  // Import the model

async function getDailyRoutineTimings() {
    try {
        const timing = await cleaningTimingsModel.getDailyRoutineTimings();
        return timing;
    } catch (err) {
        console.error('Error fetching daily routine timing:', err.message);
        throw new Error('Failed to fetch daily routine timing');
    }
}

async function getTerminalRoutineTimings() {
    try {
        const timing = await cleaningTimingsModel.getTerminalRoutineTimings();
        return timing;
    } catch (err) {
        console.error('Error fetching terminal routine timing:', err.message);
        throw new Error('Failed to fetch terminal routine timing');
    }
}

async function getDailySpecialisedTimings() {
    try {
        const timing = await cleaningTimingsModel.getTerminalSpecialisedTimings();
        return timing;
    } catch (err) {
        console.error('Error fetching daily specialised timing:', err.message);
        throw new Error('Failed to fetch daily specialised timing');
    }
}

async function getTerminalSpecialisedTimings() {
    try {
        const timing = await cleaningTimingsModel.getTerminalSpecialisedTimings();
        return timing;
    } catch (err) {
        console.error('Error fetching terminal specialised timing:', err.message);
        throw new Error('Failed to fetch terminal specialised timing');
    }
}


module.exports = { getDailyRoutineTimings, getDailySpecialisedTimings, getTerminalRoutineTimings, getTerminalSpecialisedTimings }