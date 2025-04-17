const { query } = require('./dbConnection');
  
async function getPrioritiesByPathogenId (pathogenId) {
    try {
        const sql = 'SELECT * FROM priorities WHERE pathogen_id = ?';
        const rows = await query(sql, [pathogenId]);
        return rows[0];
    } catch (err) {
        console.error('Error fetching priorities by pathogen id:', err.message);
        throw new Error('Failed to fetch priorities by pathogen id');
    }
}

module.exports = { getPrioritiesByPathogenId }