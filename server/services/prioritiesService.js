const prioritiesModel = require('../models/prioritiesModel');  // Import the model

async function getPrioritiesByPathogenId(pathogenId) {
    try {
        const priority = await prioritiesModel.getPrioritiesByPathogenId(pathogenId);
        return priority; // Return the extended protocol details
    } catch (err) {
        console.error('Error fetching priorities', err.message);
        throw new Error('Failed to fetch priorities');
    }
}

module.exports = { getPrioritiesByPathogenId }