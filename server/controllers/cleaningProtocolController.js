const cleaningProtocolService = require('../services/cleaningProtocolService');  // Import the service

// Controller function to handle the HTTP request for fetching protocol details by pathogen ID
async function fetchDailyCleaningProtocolByPathogenID(req, res) {
    try {
        const pathogenID = req.params.pathogenId;  // Extract pathogen ID from the URL parameter
        const protocolDetails = await cleaningProtocolService.getDailyCleaningProtocolByPathogenID(pathogenID);  // Call the service function
        res.status(200).json(protocolDetails);  // Send the result as a JSON response
    } catch (err) {
        console.error('Error fetching daily cleaning protocol details:', err.message);
        res.status(500).json({ error: 'Failed to fetch daily cleaning protocol details' });  // Handle errors
    }
}

async function fetchTerminalCleaningProtocolByPathogenID(req, res) {
    try {
        const pathogenID = req.params.pathogenId;  // Extract pathogen ID from the URL parameter
        const protocolDetails = await cleaningProtocolService.getTerminalCleaningProtocolByPathogenID(pathogenID);  // Call the service function
        res.status(200).json(protocolDetails);  // Send the result as a JSON response
    } catch (err) {
        console.error('Error fetching terminal cleaning protocol details:', err.message);
        res.status(500).json({ error: 'Failed to fetch terminal cleaning protocol details' });  // Handle errors
    }
}

async function fetchDailyRoutineProtocol(req, res) {
    try {
        const protocolDetails = await cleaningProtocolService.getDailyRoutineProtocol();  // Call the service function
        res.status(200).json(protocolDetails);  // Send the result as a JSON response
    } catch (err) {
        console.error('Error fetching terminal cleaning protocol details:', err.message);
        res.status(500).json({ error: 'Failed to fetch terminal cleaning protocol details' });  // Handle errors
    }
}

async function fetchTerminalyRoutineProtocol(req, res) {
    try {
        const protocolDetails = await cleaningProtocolService.getTerminalRoutineProtocol();  // Call the service function
        res.status(200).json(protocolDetails);  // Send the result as a JSON response
    } catch (err) {
        console.error('Error fetching terminal cleaning protocol details:', err.message);
        res.status(500).json({ error: 'Failed to fetch terminal cleaning protocol details' });  // Handle errors
    }
}

async function fetchDailyCleaningProtocolsByPositivePathogenID(req, res) {
    try {
        const pathogenID = req.params.pathogenId;  // Extract pathogen ID from the URL parameter
        const protocolDetails = await cleaningProtocolService.getDailyCleaningProtocolsByPositivePathogenID(pathogenID);  // Call the service function
        res.status(200).json(protocolDetails);  // Send the result as a JSON response
    } catch (err) {
        console.error('Error fetching daily cleaning protocol details:', err.message);
        res.status(500).json({ error: 'Failed to fetch daily cleaning protocol details' });  // Handle errors
    }
}


module.exports = { fetchDailyCleaningProtocolByPathogenID, fetchTerminalCleaningProtocolByPathogenID, fetchDailyRoutineProtocol, fetchTerminalyRoutineProtocol, fetchDailyCleaningProtocolsByPositivePathogenID };
