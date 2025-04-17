const { query } = require('./dbConnection');
  
async function getStaffSchedules(position, date, shift_type) {
    try {
        const sql = 'SELECT * FROM staff_schedules ss JOIN staff_information si ON ss.staff_id = si.id WHERE si.position = ? AND ss.date = ? AND ss.shift_type = ?';

        const rows = await query(sql, [position, date, shift_type]);
        return rows;
    } catch (err) {
        console.error('Error fetching staff schedules:', err.message);
        throw new Error('Failed to fetch staff schedules');
    }
}

async function getFloatingStaff(position, shift_type) {
    try {
        const sql = 'SELECT * FROM staff_schedules ss JOIN staff_information si ON ss.staff_id = si.id WHERE si.position = ? AND ss.shift_type = ? LIMIT 1';

        const rows = await query(sql, [position, shift_type]);
        return rows;
    } catch (err) {
        console.error('Error fetching floating staff:', err.message);
        throw new Error('Failed to fetch floating staff');
    }
}

module.exports = { getStaffSchedules, getFloatingStaff }