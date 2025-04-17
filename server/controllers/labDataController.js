const labDataService = require('../services/labDataService');

async function fetchPositiveLabResultsByMRN(req, res) {
    try {
        const mrn = req.params.mrn;  // Extract pathogen ID from the URL parameter
        const labResults = await labDataService.getPositiveLabResultsByMRN(mrn);  // Call the service function
        res.status(200).json(labResults);  // Send the result as a JSON response
    } catch (err) {
        console.error('Error fetching daily cleaning protocol details:', err.message);
        res.status(500).json({ error: 'Failed to fetch daily cleaning protocol details' });  // Handle errors
    }
}

async function fetchPatientMRNByWardAndBedNumber(req, res) {
    try {
        const bed_number = req.params.bed_number; 
        const ward_number = req.params.ward_number;
        const results = await labDataService.getPatientMRNByWardAndBedNumber(ward_number, bed_number);  // Call the service function
        res.status(200).json(results);  // Send the result as a JSON response
    } catch (err) {
        console.error('Error fetching patient mrn from lab data:', err.message);
        res.status(500).json({ error: 'Failed to fetch patient mrn from lab data' });  // Handle errors
    }
}


module.exports = { fetchPositiveLabResultsByMRN, fetchPatientMRNByWardAndBedNumber };