const labDataModel = require('../models/labDataModel');  // Import the model

async function getPositiveLabResultsByMRN(mrn) {
    try {
        const results = await labDataModel.getPositiveLabResultsByMRN(mrn);
        return results;  // Return the extended protocol details
    } catch (err) {
        console.error('Error fetching detailed cleaning protocol:', err.message);
        throw new Error('Failed to fetch detailed cleaning protocol');
    }
}

async function getPatientMRNByWardAndBedNumber(ward_number, bed_number) {
    try {
        const results = await labDataModel.getPatientMRNByWardAndBedNumber(ward_number, bed_number);
        return results; 
    } catch (err) {
        console.error('Error fetching patient mrn from lab data:', err.message);
        throw new Error('Failed to fetch patient mrn fromlab data');
    }
}


module.exports = { getPositiveLabResultsByMRN, getPatientMRNByWardAndBedNumber }