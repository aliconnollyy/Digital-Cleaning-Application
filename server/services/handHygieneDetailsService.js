const handHygieneDetailsModel = require('../models/handHygieneDetailsModel');  // Import the model

async function getHandHygieneDetailsByPathogenID(pathogenID) {
    try {
        const handHygieneDetails = await handHygieneDetailsModel.getHandHygieneDetailsByPathogenID(pathogenID);
        return handHygieneDetails;  // Return the extended protocol details
    } catch (err) {
        console.error('Error fetching detailed cleaning protocol:', err.message);
        throw new Error('Failed to fetch detailed cleaning protocol');
    }
}

async function getHandHygieneRoutine() {
    try {
        const handHygieneDetails = await handHygieneDetailsModel.getRoutineHandHygieneDetails();
        return handHygieneDetails;  // Return the extended protocol details
    } catch (err) {
        console.error('Error fetching detailed cleaning protocol:', err.message);
        throw new Error('Failed to fetch detailed cleaning protocol');
    }
}

module.exports = { getHandHygieneDetailsByPathogenID, getHandHygieneRoutine }