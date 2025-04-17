const ppeDetailsModel = require('../models/ppeDetailsModel');  // Import the model

async function getPPEDetailsByPathogenID(pathogenID) {
    try {
        const protocol = await ppeDetailsModel.getPPEDetailsByPathogenID(pathogenID);
        return protocol;  // Return the extended protocol details
    } catch (err) {
        console.error('Error fetching detailed cleaning protocol:', err.message);
        throw new Error('Failed to fetch detailed cleaning protocol');
    }
}

async function getPPERoutine() {
    try {
        const protocol = await ppeDetailsModel.getPPERoutine();
        return protocol;  // Return the extended protocol details
    } catch (err) {
        console.error('Error fetching detailed cleaning protocol:', err.message);
        throw new Error('Failed to fetch detailed cleaning protocol');
    }
}

module.exports = { getPPEDetailsByPathogenID, getPPERoutine }