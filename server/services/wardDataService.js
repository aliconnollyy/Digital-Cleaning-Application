const wardDataModel = require('../models/wardDataModel');  // Import the model

async function getBedsInWardByWardNumber(ward_number) {
    try {
        const wardData = await wardDataModel.getBedsInWardByWardNumber(ward_number);
        return wardData;  // Return the extended protocol details
    } catch (err) {
        console.error('Error fetching bed data:', err.message);
        throw new Error('Failed to fetch bed data');
    }
}

module.exports = { getBedsInWardByWardNumber }