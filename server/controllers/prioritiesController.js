const prioritiesService = require('../services/prioritiesService');

async function fetchPrioritiesByPathogenId(req, res) {
    try {
        const pathogenId = req.params.pathogenId;  // Extract pathogen ID from the URL parameter
        const priority = await prioritiesService.getPrioritiesByPathogenId(pathogenId);  // Call the service function
        res.status(200).json(priority);  // Send the result as a JSON response
    } catch (err) {
        console.error('Error fetching priorities:', err.message);
        res.status(500).json({ error: 'Failed to fetch priorities' });  // Handle errors
    }
}

module.exports = { fetchPrioritiesByPathogenId }