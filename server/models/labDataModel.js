const { query } = require('./dbConnection');

// const patientLabResults = labData.filter(
// 	(item) => item.MRN === patientMRN && item.labResult === "positive"
//  	 );
async function getPositiveLabResultsByMRN (mrn) {
    try {
        const sql = 'SELECT * FROM lab_data WHERE mrn = ? AND test_result = "positive"';
        const rows = await query(sql, [mrn]);
        return rows;
    } catch (err) {
        console.error('Error fetching daily cleaning protocol by pathogen id:', err.message);
        throw new Error('Failed to fetch daily cleaning protocol by pathogen id');
    }
}

// get patients mrn from lab data using wardbed and wardnumber
async function getPatientMRNByWardAndBedNumber(ward_number, bed_number) {
    try {
        const sql = 'SELECT mrn, timestamp FROM lab_data WHERE ward_number = ? AND bed_number = ?';
        const rows = await query(sql, [ward_number, bed_number]);
        return rows;
    } catch (err) {
        console.error('Error fetching patient mrn from lab data:', err.message);
        throw new Error('Failed to fetch patient mrn from lab data');
    }
}

module.exports = { getPositiveLabResultsByMRN, getPatientMRNByWardAndBedNumber }

