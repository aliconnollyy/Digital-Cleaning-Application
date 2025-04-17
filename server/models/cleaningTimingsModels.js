const { query } = require('./dbConnection');

async function getDailyRoutineTimings() {
    try {
        const sql = 'SELECT * FROM cleaning_timings WHERE cleaning_protocol = "Routine" AND cleaning_type = "Daily"';
        const rows = await query(sql);
        return rows[0];
    } catch (err) {
        console.error('Error fetching daily routine timings:', err.message);
        throw new Error('Failed to fetch daily routine timings');
    }
}

async function getTerminalRoutineTimings() {
    try {
        const sql = 'SELECT * FROM cleaning_timings WHERE cleaning_protocol = "Routine" AND cleaning_type = "Terminal"';
        const rows = await query(sql);
        return rows[0];
    } catch (err) {
        console.error('Error fetching terminal routine timings:', err.message);
        throw new Error('Failed to fetch terminal routine timings');
    }
}

async function getDailySpecialisedTimings() {
    try {
        const sql = 'SELECT * FROM cleaning_timings WHERE cleaning_protocol = "Specialised" AND cleaning_type = "Daily"';
        const rows = await query(sql);
        return rows[0];
    } catch (err) {
        console.error('Error fetching daily specialised timings:', err.message);
        throw new Error('Failed to fetch daily specialised timings');
    }
}

async function getTerminalSpecialisedTimings() {
    try {
        const sql = 'SELECT * FROM cleaning_timings WHERE cleaning_protocol = "Specialised" AND cleaning_type = "Terminal"';
        const rows = await query(sql);
        return rows[0];
    } catch (err) {
        console.error('Error fetching terminal specialised timings:', err.message);
        throw new Error('Failed to fetch terminal specialised timings');
    }
}


module.exports = { getDailyRoutineTimings, getTerminalRoutineTimings, getDailySpecialisedTimings, getTerminalSpecialisedTimings }