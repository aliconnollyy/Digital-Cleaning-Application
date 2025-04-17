const wasteDetailsModel = require('../models/wasteDetailsModel');  // Import the model

async function getWasteDetailsByPathogenID(pathogenID) {
    try {
        const wasteDetails = await wasteDetailsModel.getWasteDetailsByPathogenID(pathogenID);
        return wasteDetails;  // Return the extended protocol details
    } catch (err) {
        console.error('Error fetching detailed cleaning protocol:', err.message);
        throw new Error('Failed to fetch detailed cleaning protocol');
    }
}

async function getWasteRoutine() {
    try {
        const wasteDetails = await wasteDetailsModel.getWasteRoutine();
        return wasteDetails;  // Return the extended protocol details
    } catch (err) {
        console.error('Error fetching detailed cleaning protocol:', err.message);
        throw new Error('Failed to fetch detailed cleaning protocol');
    }
}

module.exports = { getWasteDetailsByPathogenID, getWasteRoutine }