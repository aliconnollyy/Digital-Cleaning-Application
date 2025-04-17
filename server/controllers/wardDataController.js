const wardDataService = require('../services/wardDataService');

async function fetchBedsInWardByWardNumber(req, res) {
    try {
        const ward_number = req.params.ward_number;
        const wardData = await wardDataService.getBedsInWardByWardNumber(ward_number);
        res.status(200).json(wardData);  // Send the result as a JSON response
    } catch (err) {
        console.error('Error fetching daily cleaning protocol details:', err.message);
        res.status(500).json({ error: 'Failed to fetch daily cleaning protocol details' });  // Handle errors
    }
}

module.exports = { fetchBedsInWardByWardNumber }