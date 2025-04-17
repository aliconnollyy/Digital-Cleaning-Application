const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mirrorlight45?',
    database: 'hospital_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Create a reusable query function
async function query(sql, params) {
    const [rows] = await pool.query(sql, params); // Use pool to query
    return rows;
}

module.exports = { query }; // Export the query function
