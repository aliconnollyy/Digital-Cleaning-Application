const { query } = require('./dbConnection');

async function getDailyCleaningProtocolByPathogenID(pathogenID) {
    try {
        const sql = 'SELECT * FROM disinfection_protocols WHERE pathogen_id = ? AND protocol_type = "daily"';
        const rows = await query(sql, [pathogenID]);
        return rows[0];
    } catch (err) {
        console.error('Error fetching daily cleaning protocol by pathogen id:', err.message);
        throw new Error('Failed to fetch daily cleaning protocol by pathogen id');
    }
}

async function getTerminalCleaningProtocolByPathogenID(pathogenID) {
    try {
        const sql = 'SELECT * FROM disinfection_protocols WHERE pathogen_id = ? AND protocol_type = "terminal"';
        const rows = await query(sql, [pathogenID]);
        return rows[0];
    } catch (err) {
        console.error('Error fetching daily cleaning protocol by pathogen id:', err.message);
        throw new Error('Failed to fetch daily cleaning protocol by pathogen id');
    }
}

async function getDailyRoutineProtocol() {
    try {
        const sql = 'SELECT * FROM disinfection_protocols WHERE protocol_name = "Routine Cleaning" AND protocol_type = "daily"';
        const rows = await query(sql);
        return rows[0];
    } catch (err) {
        console.error('Error fetching daily cleaning protocol by pathogen id:', err.message);
        throw new Error('Failed to fetch daily cleaning protocol by pathogen id');
    }
}

async function getTerminalRoutineProtocol() {
    try {
        const sql = 'SELECT * FROM disinfection_protocols WHERE protocol_name = "Routine Cleaning" AND protocol_type = "terminal"';
        const rows = await query(sql);
        return rows[0];
    } catch (err) {
        console.error('Error fetching daily cleaning protocol by pathogen id:', err.message);
        throw new Error('Failed to fetch daily cleaning protocol by pathogen id');
    }
}

async function getDailyCleaningProtocolsByPositivePathogenID(pathogenIDs) {
    try {
        const sql = 'SELECT * FROM disinfection_protocols WHERE pathogen_id IN (?) AND protocol_type = "daily"';
        const rows = await query(sql, [pathogenIDs]);
        return rows;
    } catch (err) {
        console.error('Error fetching daily cleaning protocol by pathogen id:', err.message);
        throw new Error('Failed to fetch daily cleaning protocol by pathogen id');
    }
}


module.exports = { getDailyCleaningProtocolByPathogenID, getTerminalCleaningProtocolByPathogenID, getDailyRoutineProtocol, getTerminalRoutineProtocol, getDailyCleaningProtocolsByPositivePathogenID };
