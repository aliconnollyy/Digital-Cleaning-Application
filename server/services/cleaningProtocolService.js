const cleaningProtocolModel = require('../models/cleaningProtocolModel');  // Import the model

// Service function to get cleaning protocol details by pathogen ID
async function getDailyCleaningProtocolByPathogenID(pathogenID) {
    try {
        // Get the protocol from the model
        const protocol = await cleaningProtocolModel.getDailyCleaningProtocolByPathogenID(pathogenID);
        return protocol;  // Return the extended protocol details
    } catch (err) {
        console.error('Error fetching detailed cleaning protocol:', err.message);
        throw new Error('Failed to fetch detailed cleaning protocol');
    }
}

async function getTerminalCleaningProtocolByPathogenID(pathogenID) {
    try {
        // Get the protocol from the model
        const protocol = await cleaningProtocolModel.getTerminalCleaningProtocolByPathogenID(pathogenID);
        return protocol;  // Return the extended protocol details
    } catch (err) {
        console.error('Error fetching detailed cleaning protocol:', err.message);
        throw new Error('Failed to fetch detailed cleaning protocol');
    }
}

async function getDailyRoutineProtocol () {
    try {
        // Get the protocol from the model
        const protocol = await cleaningProtocolModel.getDailyRoutineProtocol();
        return protocol;  // Return the extended protocol details
    } catch (err) {
        console.error('Error fetching detailed cleaning protocol:', err.message);
        throw new Error('Failed to fetch detailed cleaning protocol');
    }
}

async function getTerminalRoutineProtocol () {
    try {
        // Get the protocol from the model
        const protocol = await cleaningProtocolModel.getTerminalRoutineProtocol();
        return protocol;  // Return the extended protocol details
    } catch (err) {
        console.error('Error fetching detailed cleaning protocol:', err.message);
        throw new Error('Failed to fetch detailed cleaning protocol');
    }
}

async function getDailyCleaningProtocolsByPositivePathogenID (pathogenID) {
    try {
        // Get the protocol from the model
        const protocol = await cleaningProtocolModel.getDailyCleaningProtocolsByPositivePathogenID(pathogenID);
        return protocol;  // Return the extended protocol details
    } catch (err) {
        console.error('Error fetching detailed cleaning protocol:', err.message);
        throw new Error('Failed to fetch detailed cleaning protocol');
    }
}

module.exports = { getDailyCleaningProtocolByPathogenID, getTerminalCleaningProtocolByPathogenID, getDailyRoutineProtocol, getTerminalRoutineProtocol, getDailyCleaningProtocolsByPositivePathogenID };