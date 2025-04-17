const { query } = require('./dbConnection');
  
async function getBedsInWardByWardNumber (ward_number) {
    try {
        const sql = 'SELECT beds.bed_number, beds.patient_mrn FROM beds JOIN wards ON beds.ward_id = wards.id WHERE wards.ward_number = ?;';
        const rows = await query(sql, [ward_number]);
        return rows;
    } catch (err) {
        console.error('Error fetching bed data:', err.message);
        throw new Error('Failed to fetch bed data');
    }
}



module.exports = { getBedsInWardByWardNumber }
