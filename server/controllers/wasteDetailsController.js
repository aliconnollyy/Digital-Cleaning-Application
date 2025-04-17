const wasteDetailsService = require('../services/wasteDetailsService');

async function fetchWasteDetailsByPathogenID(req, res) {
    try {
        const pathogenID = req.params.pathogenId;  // Extract pathogen ID from the URL parameter
        const ppeDetails = await wasteDetailsService.getWasteDetailsByPathogenID(pathogenID);  // Call the service function
        res.status(200).json(ppeDetails);  // Send the result as a JSON response
    } catch (err) {
        console.error('Error fetching daily cleaning protocol details:', err.message);
        res.status(500).json({ error: 'Failed to fetch daily cleaning protocol details' });  // Handle errors
    }
}

async function fetchWasteRoutine(req, res) {
    try {
        const ppeDetails = await wasteDetailsService.getWasteRoutine();  // Call the service function
        res.status(200).json(ppeDetails);  // Send the result as a JSON response
    } catch (err) {
        console.error('Error fetching daily cleaning protocol details:', err.message);
        res.status(500).json({ error: 'Failed to fetch daily cleaning protocol details' });  // Handle errors
    }
}

module.exports = { fetchWasteDetailsByPathogenID, fetchWasteRoutine };