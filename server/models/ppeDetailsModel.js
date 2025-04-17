const { query } = require('./dbConnection');
  
async function getPPEDetailsByPathogenID (pathogenID) {
    try {
        const sql = 'SELECT * FROM ppe_protocols WHERE pathogen_id = ?';
        const rows = await query(sql, [pathogenID]);
        return rows[0];
    } catch (err) {
        console.error('Error fetching daily cleaning protocol by pathogen id:', err.message);
        throw new Error('Failed to fetch daily cleaning protocol by pathogen id');
    }
}

async function getPPERoutine () {
    try {
        const sql = 'SELECT * FROM ppe_protocols WHERE id = 1';
        const rows = await query(sql);
        return rows[0];
    } catch (err) {
        console.error('Error fetching daily cleaning protocol by pathogen id:', err.message);
        throw new Error('Failed to fetch daily cleaning protocol by pathogen id');
    }
}

module.exports = { getPPEDetailsByPathogenID, getPPERoutine }