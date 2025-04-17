const { query } = require('./dbConnection');

async function insertLabResult(mrn, ward_number, bed_number, pathogen_id, pathogen_name, test_result) {
    try {
        const sql = `
            INSERT INTO lab_data (mrn, ward_number, bed_number, pathogen_id, pathogen_name, test_result, timestamp) VALUES (?, ?, ?, ?, ?, ?, NOW())
            `;
        
        const result = await query(sql, [mrn, ward_number, bed_number, pathogen_id, pathogen_name, test_result]);

        return { result }
    } catch (err) {
        console.error('Error inserting new lab result:', err.message);
        throw new Error('Failed to insert new lab result');
    }
}

async function removePatientMRN() {
    try {
        // Step 1: Get a random bed ID where the patient_mrn is not NULL
        const bedQuery = `
            SELECT id 
            FROM beds 
            WHERE patient_mrn IS NOT NULL 
            ORDER BY RAND() 
            LIMIT 1
        `;
        
        const [bedResult] = await query(bedQuery);

        console.log(bedResult)

        if (bedResult && bedResult.id) {
            // Step 2: Remove the patient_mrn from that bed (update the bed)
            const updateQuery = `
                UPDATE beds 
                SET patient_mrn = NULL 
                WHERE id = ?
            `;
            
            await query(updateQuery, [bedResult.id]);
            return { message: 'Patient MRN removed successfully' };
        } else {
            return { message: 'No patients found to remove' };
        }
    } catch (err) {
        console.error('Error removing patient MRN:', err.message);
        throw new Error('Failed to remove patient MRN');
    }
}


module.exports = { insertLabResult, removePatientMRN };